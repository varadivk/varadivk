FROM nginx:1.27-alpine

# Copy app source into nginx html root
COPY index.html /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY controllers/ /usr/share/nginx/html/controllers/
COPY services/ /usr/share/nginx/html/services/
COPY views/ /usr/share/nginx/html/views/

# Replace default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
