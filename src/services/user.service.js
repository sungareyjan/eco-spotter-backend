const { User, RoleUser, Role, RolePermission, Permission, UserProfile } = require('../models');

class UserService {
    async getAllUsersWithAccess() {
        const users = await User.findAll({
            attributes: ['publicId', 'username', 'email', 'status'],
            include   : this._userIncludes()
        });

        return users.map(user => this._formatUser(user));
    }

    async getUserByPublicId(publicId) {
        const user = await User.findOne({
            where     : { publicId },
            attributes: ['publicId',  'username', 'email', 'status'],
            include   : this._userIncludes()
        });

        if (!user) return null;

        return this._formatUser(user);
    }

 
    // Private method to format user data
    _formatUser(user) {
        const roles = (user.role_users || [])
            .map(ru => ru.role)
            .filter(Boolean)
            .map(role => role.name);

        const permissions = [
            ...new Set(
                (user.role_users || [])
                    .flatMap(ru => (ru.role?.role_permissions || []).map(rp => rp.permission?.name).filter(Boolean))
            )
        ];

        const profiles = {};
        if (user.profile) {
            if (user.profile.bio) profiles.bio                             = user.profile.bio;
            if (user.profile.homeRegion) profiles.homeRegion               = user.profile.homeRegion;
            if (user.profile.profilePictureUrl) profiles.profilePictureUrl = user.profile.profilePictureUrl;
            if (user.profile.firstName) profiles.firstName                 = user.profile.firstName;
            if (user.profile.middleName) profiles.middleName               = user.profile.middleName;
            if (user.profile.lastName) profiles.lastName                   = user.profile.lastName;
            if (user.profile.extensionName) profiles.extensionName         = user.profile.extensionName;
            if (user.profile.gender) profiles.gender                       = user.profile.gender;
            if (user.profile.birthday) profiles.birthday                   = user.profile.birthday;
        }

        return {
            user: {
                publicId     : user.publicId,
                username     : user.username,
                email        : user.email,
                status       : user.status,
                profiles
            },
            roles,
            permissions
        };
    }

    // Private method to reuse the include array
    _userIncludes() {
        return [
            {
                model   : RoleUser,
                as      : 'role_users',
                required: false,
                include : [
                    {
                        model     : Role,
                        as        : 'role',
                        required  : false,
                        attributes: ['name'],
                        include   : [
                            {
                                model   : RolePermission,
                                as      : 'role_permissions',
                                required: false,
                                include : [
                                    {
                                        model     : Permission,
                                        as        : 'permission',
                                        required  : false,
                                        attributes: ['name']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                model     : UserProfile,
                as        : 'profile',
                required  : false,
                attributes: [
                    'bio',
                    'homeRegion',
                    'profilePictureUrl',
                    'firstName',
                    'middleName',
                    'lastName',
                    'extensionName',
                    'gender',
                    'birthday'
                ]
            }
        ];
    }

}


module.exports = new UserService();
