var passwordManager = Components.classes["@mozilla.org/login-manager;1"].
                       getService(Components.interfaces.nsILoginManager);
var nsLoginInfo = new Components.Constructor("@mozilla.org/login-manager/loginInfo;1",
                      Components.interfaces.nsILoginInfo, "init");
 
function storeUsernameAndKey(username, key) {
    var logins = passwordManager.findLogins({}, "chrome://preflight", null, 'Username and API Key');
 
    if (logins.length == 0) {
        var extLoginInfo = new nsLoginInfo('chrome://preflight',
                               null, 'Username and Password',
                               username, key, "", "");
        passwordManager.addLogin(extLoginInfo);
    } else {
        var extLoginInfo = new nsLoginInfo('chrome://preflight',
                               null, 'Username and Password',
                               username, key, "", "");
        passwordManager.modifyLogin(logins[0], extLoginInfo);
    }
}
 
function retrievePreflightUsername() {
    var logins = passwordManager.findLogins({}, "chrome://preflight", null, 'Username and Password');
    if (logins.length == 1) {
        return logins[0].username;
    } else {
        return "";
    }
}
 
function retrievePreflightPassword() {
    var logins = passwordManager.findLogins({}, "chrome://preflight", null, 'Username and Password');
    if (logins.length == 1) {
        return logins[0].password;
    } else {
        return "";
    }
}