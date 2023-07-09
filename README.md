### Prerequisites

- Node.js version 14 or above
- Nest.js
- React.js
- Ethereum Wallet

### Installing

1. Clone the repo:

```sh
git clone https://github.com/dzungdinh94/hailstone-lab-assignment
```

2. Install NPM packages in both backend and frontend directories:

```sh
cd server
npm install
```

Run it in the root of project:

```sh
npm install
```

### Running the app

1. To start the server, navigate to the backend directory and run:

```sh
npm run start
```

2. To start the frontend, navigate to the root directory and run:

```sh
npm run start
```

Now you can navigate to `localhost:9000` in your browser to see the app.

---

### Coding Challenge Questions:

**How much time did you spend on the challenge?**

- I spent approximately 38 hours on the challenge.

**How would you handle a longer time range (such as weeks to months)?**

- For handling longer time ranges, I would use a more efficient querying mechanism, perhaps making use of batch requests or using a caching mechanism to store previous results. If the backend service provides a mechanism for querying over longer time ranges, I would certainly leverage that.
- Implementing a dedicated service to fetch block timestamps: Rather than depending on a third-party service to fetch block timestamps, building an in-house service for this task would reduce dependencies and provide better control over the performance of our system. This would involve running a full or archive BSC node ourselves to have access to all the data on the blockchain, including block timestamps. This way, we can fetch the data directly from our node, reducing the latency and making the system more efficient.

**How would you improve the scalability of the backend?**

- To improve the scalability of the backend, I'd consider implementing a caching mechanism for frequently accessed data. Additionally, implementing load balancing or using a serverless architecture could be options. If data storage becomes a concern, implementing a more efficient database system could also be an improvement.

**How would you handle multiple tokens on the frontend?**

- To handle multiple tokens on the frontend, I would design the UI to allow users to select which tokens they want to view or interact with. The selection could be made through checkboxes or a dropdown list. Then, based on the selection, appropriate requests would be sent to the backend to fetch the relevant data.

**What would you improve if you had more time to spend on this coding challenge?**

- If I had more time, I would focus on improving the user interface for a better user experience. I would also work on adding more tests to ensure robustness of the code. Furthermore, I would like to add more features such as the ability to sort and filter results based on different parameters. Lastly, I would spend time on optimizing the performance, particularly for handling larger datasets.
