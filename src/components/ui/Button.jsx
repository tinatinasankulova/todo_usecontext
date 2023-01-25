import style from './Button.module.css'

const Button = (props) => {
  return (
    <button className={`${style.button} ${props.className}`}
   id={props.id}
    type={props.type || 'submit'}
    onClick={props.onClick}
    >{props.children}</button>
  )
};

export default Button;