#!/bin/bash
echo "* Request for authorization"
RESULT=`curl -d "username=chiba00807@gmail.com&password=password&grant_type=password&client_id=admin-cli" "http://localhost:8884/realms/master/protocol/openid-connect/token"`
echo "\n"

echo "* Recovery of the token"
TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`
echo "\n"
echo "* Display token"
echo $TOKEN

echo "\n"
echo " * user creation\n"
curl -v http://localhost:8884/admin/realms/admin99/users -H "Content-Type: application/json" -H "Authorization: bearer $TOKEN"   --data '{"firstName":"xyz","lastName":"xyz", "email":"demo2@gmail.com", "enabled":"true"}'
