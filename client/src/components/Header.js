
const Header = ({title, userName, budget}) => {

    return (
        <header className="container text-center mt-2 h1">
            <h1>{title}</h1>
            {/* {console.log(budget, "hello")} */}
            {/* <h2 className="mt-2">{userName}, your total budget for this month is : ${budget.map((item) => item.budget)}</h2> */}
        </header>
    )
}

export default Header;
