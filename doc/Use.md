# utilisation

1. faire un post request à "/login"

```json
{
    "username":"user",
    "password":"pasword",
    "appname":"appname"
}
```

2. récupérer la réponse

```json

{
  "Connect": true,
  "IDUser": 2,
  "Appid": 2
}

```

3. insérer un user

```sql


insert into rebuilder (username,password,is_active,firstname,lastname) 
values ('push-mail',aes_encrypt('5ZWf6dfL4','If you reveal your secrets to the wind, you should not blame the wind for revealing them to the trees'),1,'pushmail','IHM');

```

4. get all users

```sql
select user.id,user.username,aes_decrypt(user.password,'If you reveal your secrets to the wind, you should not blame the wind for revealing them to the trees') from user
```
