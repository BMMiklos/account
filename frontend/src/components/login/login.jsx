export function Login() {
    return <div>
        
        <form>

            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text"></input>

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"></input>

            <input type="submit" value="Login"></input>

        </form>
    </div>
}
