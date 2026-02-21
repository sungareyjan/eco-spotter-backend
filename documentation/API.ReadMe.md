🚀 Postman Request Species Examples
📌 Get first page (default)
GET http://localhost:3000/api/species

📌 Search
GET http://localhost:3000/api/species?search=orang

📌 Pagination
GET http://localhost:3000/api/species?page=2&limit=5

📌 Search + Pagination
GET http://localhost:3000/api/species?search=rain&page=1&limit=10

✅ Expected Response Example
{
  "status": "success",
  "code": 200,
  "data": [
    {
      "speciesId": "7b6a6d5e-0397-4b73-a001-318c893ebd47",
      "name": "Orangutan",
      "scientificName": "Pongo pygmaeus",
      "ecosystems": [
        {
          "subtypeId": "8c2e1f15-c67a-4fbd-ae90-d1865eb22c29",
          "subtypeName": "Lowland Rainforest",
          "subtypeCharacteristics": "Dense trees...",
          "typeId": "7a45c61e-42db-4a8b-adc8-8e1d970f2af8",
          "typeName": "Tropical Rainforest",
          "typeCharacteristics": "Dense canopy...",
          "categoryId": "d904f23c-8bc7-4487-804e-8cf1fae4d285",
          "categoryName": "Forest"
        }
      ]
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}