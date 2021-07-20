# How to Deploy Flipic on AWS EC2

## 1. Create and connect to EC2 instance and install dependancies
Follow this tutorial for the first 3 steps
https://jasonwatmore.com/post/2019/11/18/react-nodejs-on-aws-how-to-deploy-a-mern-stack-app-to-amazon-ec2
### Create a new Ubuntu server on AWS EC2
During this step configure the server to response to https requests as well as http, this will be important later.
![image](https://user-images.githubusercontent.com/58717330/126247147-95add1fe-c49e-4350-94eb-b21b697a8822.png)

### Connect to Ubuntu EC2 instance via SSH

### Setup server with Node.js + MongoDB + NGINX

## 2. Download and serve project files
Clone the Repo https://github.com/bryanwyk/flipic.git into /opt

```sudo git clone https://github.com/bryanwyk/flipic.git```

Run the Back-end API

```sudo pm2 start flipic/back-end/server.js```

Configure Nginx to serve the front end from the front-end build folder
First delete the default configuration files

```sudo rm /etc/nginx/sites-available/default```

Then launch nano text editor with

```sudo nano /etc/nginx/sites-available/default```

paste this in

```
server {
  listen 80 default_server;
  server_name _;

  # react app & front-end files
  location / {
    root /opt/flipic/front-end/build;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:4000/;
  }
}
```

Press ctrl-o and enter to write the changes
ctrl-x to exit nano

Now restart nginx to apply the changed configuration
```sudo systemctl restart nginx```

The front end files are static and will be served directly from the build folder.
Web requests to the server ending in /api will be routed to localhost:4000 which is where server.js is serving requests from.

You can now visit the url of the ec2 instance and check that web requests are being served.

![image](https://user-images.githubusercontent.com/58717330/126247849-fe3c90f0-a114-484a-a45d-996660ffc3b0.png)

The website will not work fully yet as the auth0 will only work on https connections.

![image](https://user-images.githubusercontent.com/58717330/126247866-68cb82cf-a7d9-41e3-846d-f4d38a60ecb9.png)

To remedy this we will use Certbot to issue us a certificate

## 3. Register domain and configure HTTPS

This is necessary as certbot will not work on the supplied ec2 url, it needs a configured domain name.

I used route53 on AWS but there are ways to get free domain names from other services that will work within AWS.

Once you have a domain go into the hosted zone for it and configure a CNAME record to redirect traffic to your ec2 instance

![image](https://user-images.githubusercontent.com/58717330/126248268-0b62b489-c3b2-4927-89c9-32f75a12bba7.png)

Follow the instructions on this page
https://certbot.eff.org/lets-encrypt/ubuntubionic-nginx

Run through the wizard and Certbot should do the rest, this includes editing your Nginx configuration files.

For flipic.net my config ending up looking like this
```
server {
  listen 80 default_server;
  server_name _;

  # react app & front-end files
  location / {
    root /opt/flipic_build/build;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:4000/;
  }
}
server {
    server_name www.flipic.net; # managed by Certbot

  # react app & front-end files
  location / {
    root /opt/flipic_build/build;
    try_files $uri /index.html;
  }

  # node api reverse proxy
  location /api/ {
    proxy_pass http://localhost:4000/;
  }


    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/www.flipic.net/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/www.flipic.net/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}server {
    if ($host = www.flipic.net) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


  listen 80 ;
    server_name www.flipic.net;
    return 404; # managed by Certbot
}
```

You can see that HTTPS is served from port 443 which is why we specified that earlier in the security group for the ec2 instance.

Once it is complete, restart Nginx again
```sudo systemctl restart nginx```

The app should now be lived and accessible by url from any device from your domain.

Note*

If you hosting this from a different domain and under a different auth0 account both of these factors will need to be specified in the front-end files then the build folder recompiled with npm run build.

To transfer files into ec2 create a git repository and pull the changes into the EC2 instance

Any questions or queries please email me @ lockton.sam@gmail.com 
