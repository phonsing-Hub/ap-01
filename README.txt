docker build -t ap-01 .
docker run -d -p 4000:4000 --env-file .env.local ap-01