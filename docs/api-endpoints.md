# CRUD Endpoints

## Endpoints Overview
1. [View Single Lesson](#view-single-lesson)
2. [View All Lessons](#view-all-lessons)
3. [Create Lesson](#create-lesson)
4. [Update Lesson](#update-lesson)
5. [Delete Lesson](#delete-lesson)
6. [Upload Attachment](#upload-attachment)
7. [Download Attachment](#download-attachment)
8. [Delete Attachment](#delete-attachment)
9. [Error Formatting](#error-formatting)


## View Single Lesson

- **Request:** ```GET /api/lessons/{id}``` ```HTTP/1.1```
- **URL parameters:**
  - ```id``` - the lesson ID (integer)
- **Response:**
```json
{ "id": 12,
"objective": "To find half and quarter of an amount",
"subject": "Maths",
"year_group": "Year 4",
"date": "2025-10-11",
"success_criteria": "Steps to success",
"activities": "Lesson details and activities",
"created_at": "2025-10-11T13:55:20Z",
"updated_at": "2025-10-11T13:56:22Z",
"useful_links": [
  "https://www.google.com/",
  "https://www.bbc.co.uk/bitesize/"
  
"attachments": [
  {
  "id": 3,
  "original_name": "Fraction-Cards.pdf",
  "mime_type": "application/pdf",
  "size_bytes": 245321,
  "download_url": "/api/attachments/3"
  }
  ]
```
- **Response Code:** ```200 OK```
- **Additional notes:** ```404 Not Found``` for invalid id


## View All Lessons

- **Request:** ```GET /api/lessons``` ```HTTP/1.1```
- **URL parameters:**
  - ```q``` (search in objective)
  - ```subject``` (e.g. ```Maths```)
  - ```year_group``` (e.g. ```Year 4```)
  - ```date_from```, ```date_to``` (```YYYY-MM-DD```)
  - ```page``` (pagination)
- **Response:** 
```json
{
  "data": [
    {"id": 12, "objective": "Fractions", "subject": "Maths", "year_group": "Year 4", "date": "2025-10-11" },
    {"id": 11, "objective": "Expanded Noun Phrases", "subject": "English", "year_group": "Year 3", "date": "2025-10-06" }
  ],
  "meta": {
    "current_page": 1,
    "last_page": 3,
    "total": 25
  }
}
```
- **Response Code:** ```200 OK```
- **Additional notes:** 'No lessons found' message if data is empty.


## Create Lesson

- **Request:** ```POST /api/lessons``` ```HTTP/1.1```
- **Body Parameters (JSON):**
  - ```objective``` (string, required, < 120)
  - ```subject``` (string, required, <60) __dropdown__
  - ```year_group``` (string, required, <20) __dropdown__
  - ```date``` (date, required, ```YYYY-MM-DD```)
  - ```success_criteria``` (string, optional)
  - ```activities``` (string, optional)
  - ```useful_links``` (URL, optional)
- **Response:**
```json
{
"id": 13,
"objective": "To find half and quarter of an amount",
"subject": "Maths",
"year_group": "Year 4",
"date": "2025-10-11",
"success_criteria": null,
"activities": null,
"created_at": "2025-10-11T13:55:20Z",
"updated_at": "2025-10-11T13:56:22Z",
"useful_links": []
  
"attachments": []
}
```
- **Response Code:** ```201 Created```
- **Additional notes:** ```422 Unprocessable Entity``` (validation errors)


## Update Lesson

- **Request:** ```PUT /api/lessons/{id}``` ```HTTP/1.1```
- **URL Parameters:** ```id``` (integer)
- **Body parameters (JSON):** Same fields as create; send the ones that have been updated.
- **Response:**
```json
{ "id": 12,
"objective": "To find half and quarter of an amount",
"subject": "Maths",
"year_group": "Year 4",
"date": "2025-10-11",
"success_criteria": "Steps to success",
"activities": "Lesson details and activities",
"created_at": "2025-10-11T13:55:20Z",
"updated_at": "2025-10-11T13:56:22Z", // Update with current time
"useful_links": [
  "https://www.google.com/",
  "https://www.bbc.co.uk/bitesize/"
  
"attachments": [
  {
  "id": 3,
  "original_name": "Fraction-Cards.pdf",
  "mime_type": "application/pdf",
  "size_bytes": 245321,
  "download_url": "/api/attachments/3"
  }
  ]
```

- **Response Code:** ```200 OK```
- **Additional notes:** ```404 Not Found``` (incorrect id), ```422 Unprocessable Entity```

## Delete Lesson

- **Request:** DELETE ```/api/lessons/{id}``` ```HTTP/1.1```
- **URL Parameters:** ```id``` (integer)
- **Response:** (no body)
- **Response Code:** ```204 No Content```
- **Additional notes:** Associated attachments are deleted

## Upload Attachment
- **Request:** ```POST /api/lessons/{id}/attachments``` ```HTTP/1.1```
- **URL Parameters:** ```id``` (lesson id)
- **Response:**
```json
{
  "id": 7,
  "lesson_id": 12,
  "original_name": "LessonSlides.pptx",
  "mime_type": "application/vnd.openxmlformats-officedocuments.presentationml.presentation",
  "size_bytes": 918223,
  "storage_path": "attachments/....pptx",
  "download_url": "api/attachments/7",
  "created_at": "2025-10-11T14:39:41"
}
```
- **Response Code:** ```201 Created```
- **Errors:** ```413 Payload Too Large``` (larger files), ```415 Unsupported Media Type```, ```422 Unprocessable Entity```

## Download Attachment
- **Request:** ```GET /api/lessons/{id}/{attachmentID}``` ```HTTP/1.1```
- **URL Parameters:** ```id```(integer, lesson id) ```attachmentID``` (integer, attachment id)
- **Response:** binary file stream
- **Response Code:** ```200 OK```
- **Errors:** ```404 Not Found``` (incorrect lesson or attachment id)

## Delete Attachment
- **Request:** ```DELETE /api/lessons/{id}/{attachmentID}``` ```HTTP/1.1```
- **URL parameters:** ```id``` (integer, lesson id) ```attachmentID``` (integer, attachment id)
- **Response:** (no body)
- **Response Code:** ```204 No Content```

## Error Formatting
- **Error:** Validation Error (```422```)
- **Response**:
```json
{
"message": "The given data was invalid.",
"errors": {
  "objective": ["The objective field is required."]
}
}
```

- **Error:** Not found (```404```)
- **Response:**:
```json
{"message": "Resource not found." }
```
