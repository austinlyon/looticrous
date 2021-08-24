export default function NavItem(props) {
  return (
    <div
      id = {props.id}
      className='navItem'
      onClick =  {props.clickHandler}
    >
      {props.text}
    </div>
  );
}
