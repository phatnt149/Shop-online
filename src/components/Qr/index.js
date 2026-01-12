function Qr(props){
    const {total}= props
    console.log(total)
    return(
        <>
            <img src={`https://img.vietqr.io/image/MB-9699693979-compact2.png?amount=${total}&addInfo=Thanh toan don hang&accountName=NGUYEN TIEN PHAT`}/>
        </>
    )
}

export default Qr;