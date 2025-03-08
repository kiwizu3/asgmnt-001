import About from "../components/About";
import Companies from "../components/Companies";
import Header from "../components/Header";
import Stats from "../components/Stats";
import LatestPosts from "../components/LatestPosts";

const Home = () => {
    return (
        <div className="main-bg container-fluid">
            <Header />
            <div className="row d-flex my-5 justify-content-center">
                <div className="col-8">
                    <Companies />
                </div>
                <div className="col-12 my-5 text-center">
                    <Stats />
                </div>
            </div>

            <About />
           <div className="my-5">
           <LatestPosts />
           </div>
        </div>
    )
}
export default Home;