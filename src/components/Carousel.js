import React, { useState ,useEffect} from 'react'
import "./Caro.scss"



const Carousel = ({ h ,post}) => {
    const [img,setimg]=useState()
    useEffect(() => {
        if(post){
            const dev=post;
            setimg(dev.purl)
        }
        
    }, [post])
    const [check,Setcheck]=useState(false)
    class Dev extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                ori: false
            }
        }
        componentDidMount(){
            window.addEventListener("resize",this.Resizer)
        }
        componentWillUnmount(){
            window.removeEventListener("resize",this.Resizer)

        }
        getSnapshotBeforeUpdate(pre,snap){
           
            return snap.ori;
        }
        componentDidUpdate(pre,st,snap){
            this.condition(snap)
        }
        condition=(snap)=>{
            if(snap!==this.state.ori){
               let trap=this.state.ori;
               this.props.val(trap)
           
            }
        }
        Resizer=()=>{
          
                if(window.innerWidth<=540){
                    this.setState({
                        ori:true
                    })
                }else{
                    this.setState({
                        ori:false
                    })
                }
         
        }
        render() {
         
            return (<></>)
        }
    }
    const dev=()=>{
        const meta=document.querySelector("img");
        const a = document.createElement("a");
        a.href = meta.src;
        a.download = "social.jpg";
        a.click()
    }
    
    return (
        <>
            <div className='Carousels' onClick={dev}>
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">
                        <div className='carousel-item active'>
                            <img id="star" style={{ width: "100%", height: h ?check?"auto": "520px" : "auto"}} src={img} alt='ismsg' />
                        </div>
                        


                    </div>
                  
                </div>
            </div>
 <Dev val={Setcheck}/>
        </>
    )
}

export default Carousel
// CODE CREATED BY ARYAN
//       github  https://github.com/itsmeAryan
//       website https://my-social-apps.herokuapp.com/
//       youtube https://www.youtube.com/channel/UCBKbLITqJc7C-vx-xwUILmg
//       email   spidy12k@gmail.com
//       FOLLOW ME GUYS......
// ITS ME ARYAN