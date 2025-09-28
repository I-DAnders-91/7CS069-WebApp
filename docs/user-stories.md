# Lesson Planning App - User Stories

The user stories use a User ('As a'), Goal ('I want'), Benefit ('So that') structure making it easier to define the user's requirements. The acceptance explains what a user must do (input) and the output they receive.

__Reference:__ GeeksforGeeks(2025) **How Do You Write a User Story?**. Available at: https://www.geeksforgeeks.org/software-engineering/how-do-you-write-a-user-story/#1-identify-the-user. Accessed: 28th Sept. 2025.

## Overview
[MVP Features](#mvp-features)
- [Create a Lesson](#create-a-lesson)
- [Validate Lesson Fields](#validate-lesson-fields)
- [View Lessons](#view-lessons)
- [Search and Filter Lessons](#search-and-filter-lessons)
- [View Lesson Details](#view-lesson-details)
- [Edit or Delete a Lesson](#edit-or-delete-a-lesson)
- [Upload an Attachment](#upload-an-attachment)
- [Download or Delete an Attachment](#download-or-delete-and-attachment)
- [Responsive and Accessible UI](#responsive-and-accessible-ui)
[Stretch Features](#stretch-features)
- [Authentication](#authentication)
- [Tags and Advanced Search](#tags-and-advanced-search)
- [Export lesson (PDF)](#export-lesson-pdf)
- [AI Assisted Lessons](#ai-assisted-lessons)

## MVP Features
### Create a Lesson
__As a__ teacher,
__I want__ to create a new lesson with core details
*__So that__ I can plan and organising upcoming lessons

__Acceptance__
*__Given__ I'm on "Create New Lesson"
*__When__ I enter valid lesson objective, subject, year group, date, activities
  *__Then__ the lesson is saved and I'm redirected to its detail page to view

### Validate Lesson Fields
__As a__ teacher,
__I want__ clear validation messages
*__So that__ I can quickly fix input mistakes

__Acceptance__
*__Given__ required fields are empty/invalid
*__When__ I submit
  *__Then__ I see inline errors and a 422 error with field messages

### View Lessons
__As a__ teacher,
__I want__ a list of my lessons
*__So that__ I can quickly access or update them

__Acceptance__
*__Given__ lessons exist
*__When__ I open "My Lessons"
  *__Then__ I see a list with title, subject, year group, and a link to full details.

### Search and Filter Lessons
__As a__ teacher,
__I want__ to search lessons
*__So that__ I can find specific plans fast

__Acceptance__
*__Given__ I'm on "My Lessons"
*__When__ I search by title/keyword 
  *__Then__ the list updates to matching items and shows empty state if there are none.

### View Lesson Details
__As a__ teacher,
__I want__ to view all lesson information
*__So that__ I can review objectives, activities, and attachments when teaching

__Acceptance__
*__Given__ a lesson exists
*__When__ I open its detail page
  *__Then__ I see all fields and its attachments

### Edit or Delete a Lesson
__As a__ teacher,
__I want__ update or delete lesson details
*__So that__ I can refine or remove plans over time

__Acceptance__ 
*__Given__ a lesson exists
*__When__ I edit fields and save valid changes
  *__Then__ updates persist and I see a confirmation
 
### Upload an Attachment
__As a__ teacher,
__I want__ to attach lesson files (.ppt, .pdf, .docx, images)
*__So that__ all resources are accessible from the plan

__Acceptance__
*__Given__ I'm on a lesson's detail page
*__When__ I upload a valid file of an allowed type
  *__Then__ I see upload progress before the file appears in the attachments list with name, size, and type

### Download or Delete and Attachment
__As a__ teacher,
__I want__ download or remove files
*__So that__ I can reuse or clean up resources

__Acceptance__
*__Given__ an attachment exists
*__When__ I click download
  *__Then__ the file is downloaded through my browser

*__When__ I click delete
  *__Then__ the file and database record are removed and the attachment list is updated

### Responsive and Accessible UI
__As a__ teacher,
__I want__ to use the app on phone/tablet/desktop and with keyboard
*__So that__ it fits my workflow

__Acceptance__
*__Given__ different screen widths
*__When__ I navigate
  *__Then__ layout adapts without element overflow

## Stretch Features

### Authentication
__As a__ teacher,
__I want__ sign in
*__So that__ only I can see and edit my lessons

__Acceptance__
* register/login/logout endpoints
* unauthenticated/unauthorised users are redirected

### Tags and Advanced Search
__As a__ teacher,
__I want__ to tag lessons and search by tag
*__So that__ I can organise a larger library of lessons

__Acceptance__
*__Given__ tags are created

*__When__ creating a lesson
  *__Then__ custom or existing tags can be added

*__When__ searching
  *__Then__ lessons with the searched tag are displayed

### Export Lesson (PDF)
__As a__ teacher,
__I want__ to export a lesson
*__So that__ I can share and print plans

__Acceptance__
*__Given__ a lesson exists
*__When__ export is clicked
  *__Then__ a PDF is generated with key fields and attachment list

### AI Assisted Lessons
__As a__ teacher,
__I want__ to use an AI prompt to generate a lesson
*__So that__ my workflow is more efficient

__Acceptance__
*__Given__ user is creating a lesson
*__When__ inputs lesson objective, year group, and subject
  *__Then__ an AI prompt will create a lesson based on the fields in the form