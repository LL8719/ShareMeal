import myVideo from "../assets/sharemeal.mp4";

export default function Header(){



    return  <div className="video-background">
    <video autoPlay loop muted style={{width: "100%"}}>
        <source src={myVideo} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
</div>
}