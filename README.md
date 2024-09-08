# GitLab Time Spent Measurement

## Overview
This Node.js application serves as a GitLab API client designed to measure and summarize time spent on projects. It provides endpoints to retrieve total time spent on projects and the time that has not been billed.

## Features
- Fetch total time spent on a specific project.
- Retrieve not billed time for a project.
- Easy integration with GitLab API using your access token.

## Getting Started

### Prerequisites
- Node.js (version 12 or higher)
- A GitLab account
- GitLab API access token

### Installation
1. Clone the repository:
   ```bash
   git clone https://your-repo-url.git
   cd gitlab_time_stats
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the application:
   - Copy `config.js.example` to `config.js` and fill in your GitLab API access token and other necessary configurations:
     ```javascript
     module.exports = {
         access_token: '<your gitlab API access token here>',
         api_base_url: '<your gitlab API host without protocol part>',
         label_billed: 'horas_facturadas',
         users: {exampleUser: 'hisPassword'},
         price_rate: 100,
         money_unit: '$'
     };
     ```

### Running the Application
Start the server:
npm start

The application will be running on the default port (usually 3000). You can change this in the server configuration if needed.

## API Endpoints
- **Get Total Time Spent**
  - **Endpoint:** `GET /api/projects/:id/total_time/:label?`
  - **Parameters:**
    - `id`: Project ID
    - `label` (optional): Label for filtering time spent
  - **Response:** JSON object with total time spent.

- **Get Not Billed Time**
  - **Endpoint:** `GET /api/projects/:id/not_billed_time`
  - **Parameters:**
    - `id`: Project ID
  - **Response:** JSON object with not billed time.

## Error Handling
In case of an error, the API will return a JSON object with the status code and an error message.

## License
This project is licensed under the ISC License.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes or enhancements.

## Acknowledgements
- Thanks to the GitLab API for providing the necessary endpoints to retrieve project statistics.
