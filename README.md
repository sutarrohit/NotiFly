## NotiFly

Notifly is a crypto notification platform designed to deliver real-time cryptocurrency price notifications.
It is crafted to keep users informed about the latest developments in the crypto market, ensuring they receive timely updates on price fluctuations and trends.

<img src="https://notifly28.s3.eu-north-1.amazonaws.com/Screenshot+from+2023-12-15+23-43-16.png" alt="Logo">

### Technologies Used

- Next.js
- GraphQL
- PostgreSQL
- Tailwind
- Recoil
- Prisma

## Components

- **Web** : Frontend build using Nextjs
- **GraphQL** : Backend server build using GraphQL
- **Webscoket** : Websocket server to provide realtime cryptocurrency price data.
- **NotificationEngine** : Compare notification target price set by the user with the live token price and trigger the notification.
- **WorkerNodes** : Fetch triggered notifications from the Redis queue and send them to the user's email.

## Getting Started

- Clone this repository to your local machine.
- Navigate to the project directory and run yarn install to install the dependencies.
- Create a .env file in the root directory and add the necessary environment variables. See .env.example for a list of the required variables.
- Start the development sever.
- Visit http://localhost:3000 in your web browser to access the notifly.

## Contributing

If you would like to contribute to the project, please fork the repository and submit a pull request with your changes.
