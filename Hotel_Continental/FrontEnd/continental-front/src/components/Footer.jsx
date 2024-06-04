import './styles/Footer.css'

function Footer(){
    return(
        <footer className='piePag'>
            <p className='textoFooter'>&copy; {new Date().getFullYear()}-Continental all rights reserved</p>
        </footer>
    );
}
export default Footer