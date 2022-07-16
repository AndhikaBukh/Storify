
// view forgot password email
exports.forgotPass = (username, resetUrl) => {
    return `<head>
    <title>Forgot Password</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: white;
        }

        .body {
            background-color: #0e101d;
        }

        .text-center {
            text-align: center;
        }

        .header {
            text-align: center;
            color: white;
        }

        .head-1 {
            background: #191c32;
            font-size: 1.8rem;
        }

        .head-2 {
            font-size: 1.2rem;
        }

        .head-3 {
            color: gray;
            font-size: 1rem;
        }

        .btn{
            font-weight: bold;
            line-height: 40px;
            height: 100%;
            text-decoration: none;
            text-align: center;
            display: inline-block;
            width: 100%;
            background-color: #295adb;
            outline: none;
            border: none;
            color: white;
        }

        .btn:visited{
            background-color: #295adb;
            color: white;
        }

        /*# sourceMappingURL=style.css.map */
    </style>
</head>

<body style="margin: 0; padding: 0">
    <table style="border-collapse: collapse" align="center" cellpadding="0" cellspacing="0" width="100%" class="body">
        <tr>
            <td>
                <table width="100%" cellpadding="0" cellspacing="0" class="header">
                    <tr>
                        <td height="65px" class="head-1"><b>Sylly</b></td>
                    </tr>
                    <tr>
                        <td class="head-2" height="45px">Forgot Password</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" cellspacing="10">
                    <tr>
                        <td height="35px">Hello!, <b>${username}</b></td>
                    </tr>
                    <tr>
                        <td height="0px">
                            We're sorry to hear that you're having trouble with logging 
                            in to Sylly. We've received a message that you've forgotten your password.
                            if this was you, you can reset your password now.
                        </td>
                    </tr>
                    <tr>
                        <td height="40px">
                            <a href="${resetUrl}" class="btn">RESET PASSWORD</a>
                        </td>
                    </tr>
                    <tr>
                        <td height="35px">If you didn't request a login link or password reset, you can ignore this message.</td>
                    </tr>
                    <tr>
                        <td height="35px">Only people who know your Sylly password or click the login link in this email can log in to your account.</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" cellspacing="30">
                    <tr>
                        <td class="head-3 text-center">Sylly Project</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

    `
};

// For Verify Email
exports.verifyEmail = (email, token) => {
    return `<head>
    <title>Forgot Password</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
            color: white;
        }

        .body {
            background-color: #0e101d;
        }

        .text-center {
            text-align: center;
        }

        .header {
            text-align: center;
            color: white;
        }

        .head-1 {
            background: #191c32;
            font-size: 1.8rem;
        }

        .head-2 {
            font-size: 1.2rem;
        }

        .head-3 {
            color: gray;
            font-size: 1rem;
        }

        .btn{
            font-weight: bold;
            line-height: 40px;
            height: 100%;
            text-decoration: none;
            text-align: center;
            display: inline-block;
            width: 100%;
            background-color: #295adb;
            outline: none;
            border: none;
            color: white;
        }

        .codeOTP{
            font-weight: bold;
            line-height: 40px;
            height: 100%;
            width: 100%;
            background-color: #295adb;
            color: white;
            text-align: center;
        }
    
        /*# sourceMappingURL=style.css.map */
    </style>
</head>

<body style="margin: 0; padding: 0">
    <table style="border-collapse: collapse" align="center" cellpadding="0" cellspacing="0" width="100%" class="body">
        <tr>
            <td>
                <table width="100%" cellpadding="0" cellspacing="0" class="header">
                    <tr>
                        <td height="65px" class="head-1"><b>Sylly</b></td>
                    </tr>
                    <tr>
                        <td class="head-2" height="45px">Forgot Password</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" cellspacing="10">
                    <tr>
                        <td height="35px">Hello!, <b>${email}</b></td>
                    </tr>
                    <tr>
                        <td height="0px">
                        To complete your registration, please fill this code in the verification code page.
                        </td>
                    </tr>
                    <tr>
                        <td height="40px">
                            <p class="codeOTP">${token}</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td>
                <table width="100%" cellspacing="30">
                    <tr>
                        <td class="head-3 text-center">Sylly Project</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

    `
}