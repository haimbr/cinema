import SearchMovie from "./SearchMovie"


const HomePage = () => {
    return (
        <div className="home-page__container">
            <div>
                <h1>ערוך סרט</h1>
                <p>נא לבחור סרט מהרשימה</p>
                <SearchMovie />
            </div>
            <div>
                <h1>הוסף סרט</h1>
            </div>
        </div>
    )
}

export default HomePage
