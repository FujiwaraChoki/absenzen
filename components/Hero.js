const Hero = ({ logout }) => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("https://images.squarespace-cdn.com/content/v1/569f26611c1210ba261734e2/1561621857321-SUCZEYO2SYRXUPIXMH5R/photo-1507358522600-9f71e620c44e.jpeg")` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Wilkommen!</h1>
                    <p className="mb-5">Das Absenzensystem der Zukunft.</ p>
                    <label htmlFor="login-modal" className="btn btn-primary">Anmelden</label>
                    {
                        logout && (
                            <div id="toast-success" className="flex items-center w-full max-w-xs p-4 mt-5 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                    <span className="sr-only">Check icon</span>
                                </div>
                                <div className="ml-3 text-sm font-normal">Erfolgreich abgemeldet.</div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Hero
