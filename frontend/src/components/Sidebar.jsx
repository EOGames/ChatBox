import { Link } from "react-router-dom";

const Sidebar = () =>
{
    return (
        <div className="sidebar">
            <ul>
                <li>
                <Link  className="link" to={'/'}>Home</Link>
                </li>
                <li>
                <Link className="link" to={'/history'}>Chathistory</Link>
                </li>
            </ul>

        </div>
    );
}
export default Sidebar;