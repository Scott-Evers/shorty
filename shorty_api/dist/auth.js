export const validate_token = (req, res, next) => {
    let valid_auth = true;
    console.log('validating credentials');
    req.headers['user'] = undefined;
    req.headers['groups'] = undefined;
    req.headers['user'] = '12345';
    req.headers['groups'] = JSON.stringify(['group1', 'group2']); //TODO: validate JWT here (https://javascript.plainenglish.io/verifying-json-web-tokens-with-express-jwt-1ae147aa9bd3)
    if (valid_auth) {
        console.log(`credentials are valid for ${req.headers.user}`);
        next();
    }
    else {
        res.status(401).send('Credentials could not be validated');
    }
};
