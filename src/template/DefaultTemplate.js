
import Footer from '../components/footer';
import Header from '../components/header';


export default function DefaultTemplate({
  className = "container-fluid",
  title,
  children //chua cac screen
}) {
  return (
    <div className={className} id="wrapper">
      <Header/>
      <div className="row">
        <h3>{title}</h3>
      </div>
      {children}
      <Footer/>
    </div>
  );
}
