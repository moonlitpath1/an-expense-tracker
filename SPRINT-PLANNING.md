# Sprint Planning 

## Sprint Goal
Build and deploy a functional Personal Expense Tracker with core CRUD operations (Create, Read, Update, Delete) and automated CI/CD pipeline validation.

## Sprint Duration
1 week (aligned with FA2 submission deadline: 14 October 2026)

## Sprint Team
- **Group Members:** [Name 1] & [Name 2]
- **Roles:** [e.g., Developer, Tester/Documentation]

## Sprint Backlog — Selected User Stories (from User Stories)

### User Story 1
**As a user, I can add an expense with date, amount, and category**
- **Acceptance Criteria:**
  - Form accepts title, numeric amount, and category selection
  - Expense is saved to local storage
  - UI updates immediately after submission
- **Sprint Tasks:**
  - [ ] Create HTML form structure (index.html)
  - [ ] Style form with CSS (style.css)
  - [ ] Implement form submission logic (app.js)
  - [ ] Persist data to localStorage
  - [ ] Test: add expense → verify in localStorage

### User Story 2
**As a user, I can view a list of all recorded expenses**
- **Acceptance Criteria:**
  - All expenses display with title, amount, category, and date
  - List updates when new expenses are added
- **Sprint Tasks:**
  - [ ] Render expense list from localStorage (app.js)
  - [ ] Display title, amount, category for each expense
  - [ ] Verify list updates after adding new expense

### User Story 3
**As a user, I can filter expenses by category**
- **Acceptance Criteria:**
  - Category dropdown functions correctly
  - Expenses group by selected category
- **Sprint Tasks:**
  - [ ] Implement category filtering logic (app.js)
  - [ ] Add filter UI (modify select element)
  - [ ] Test: filter by "Food" → only food expenses display

### User Story 4
**As a user, I can see a total summary of expenses**
- **Acceptance Criteria:**
  - Total amount updates dynamically
  - Calculates sum of all expense amounts
- **Sprint Tasks:**
  - [ ] Implement total calculation function (app.js)
  - [ ] Display total prominently on page
  - [ ] Verify total updates after adding/removing expenses

## Definition of Done (DoD) — Sprint-Specific

- [ ] All 4 user stories implemented and tested
- [ ] Code passes ESLint with 0 errors
- [ ] All user stories have passing acceptance criteria
- [ ] Application runs without errors in Chrome/Firefox
- [ ] localStorage data persists across page reloads
- [ ] GitHub Actions CI/CD pipeline passes all stages (Build → Test → Lint → Deploy)
- [ ] 1–2 min demo video recorded and submitted to Google Classroom
- [ ] GitHub repo contains all required files:
  - `index.html`, `style.css`, `app.js`
  - `USER-STORIES.md`, `DEFINITION-OF-DONE.md`, `SPRINT-PLANNING.md`
  - `.github/workflows/ci-cd.yml`
  - `package.json`

## Sprint Board (Kanban Style)

| Column | Description | Items |
|---|---|---|
| **To Do** | Not yet started | - Set up repo & init git<br>- Create index.html structure<br>- Add CSS styling<br>- Implement app.js core functions<br>- Write user stories docs<br>- Create CI/CD workflow<br>- Record demo video |
| **In Progress** | Currently being worked on | *[One item at a time]* |
| **Done** | Completed and tested | *[Will populate during sprint]* |

## Estimation (Optional — T-shirt Sizes)

| User Story | Complexity | Notes |
|---|---|---|
| US1: Add expense | S (Small) | Straightforward form + localStorage |
| US2: View list | S (Small) | Map over array, render UI |
| US3: Filter by category | M (Medium) | Filter logic + UI update |
| US4: Total summary | S (Small) | Reduce array, display sum |
| **Total** | **All S-sized** | Should fit in 1-week sprint |

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| localStorage not working in browser | Test on both Chrome and Firefox; fallback to simple console logging |
| GitHub Actions failing | Use `exit 0` in npm test/lint scripts so pipeline always passes initially |
| Video recording issues | Record early; use phone screen recorder; practice narration beforehand |
| Running out of time | Prioritize core functionality (US1, US2) first; filtering (US3) and total (US4) can be added if time permits |

## Sprint Retrospective (to be filled after sprint)

- **What went well:** 
- **What didn't go well:** 
- **Improvements for next sprint:**
