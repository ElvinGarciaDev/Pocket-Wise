
const Header = ({title, userName, budget}) => {

    return (
        <header className="container text-center mt-5 h1">
            <h1>{title}</h1>
            <h2 className="mt-5">{userName}, your total budget for this month is : ${budget}</h2>
        </header>
    )
}

export default Header;