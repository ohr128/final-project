import logo from "../../assets/logo.png";

function Cart(){

    return(

        <div className="container">


            <div className="flex justify-center mb-16">
                <Link to="/">
                    <img className="w-50" src={logo} alt="" />
                </Link>
            </div>

            <div>
                <span>장바구니</span>
            </div>



        </div>  
    
    );


}

export default Cart;