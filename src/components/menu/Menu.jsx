import "./menu.scss"

export default function Menu({ menuOpen, setMenuOpen}) {
    return (
        <div className={"menu "+(menuOpen && "active")}>
            <ul>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/#intro">Home</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/#aboutMe">About Me</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/#skills">Skills</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/#experience">Experience</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/#projects">Projects</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/#education">Education</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/data-science">Data Science</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/software-engineering">Engineering</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/mastersprojects">Masters Projects</a>
                </li>
                <li onClick={()=>setMenuOpen(false)}>
                    <a href="/contactme">Contact</a>
                </li>
            </ul>
        </div>
    )
}
