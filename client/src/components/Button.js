const Button = ({text, color, btnType}) => {

    return (
        <button type={btnType} className={color}>{text}</button>
    )
}

export default Button;
