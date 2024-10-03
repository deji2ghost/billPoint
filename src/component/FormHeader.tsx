interface head{
    header: string,
    paragraph: string,
}

const FormHeader = ({header, paragraph}: head) => {
  return (
    <div className="">
        <h1 className="text-DarkGrey text-[24px] md:text-[32px] font-[700] leading-[36px] md:leading-[48px]">{header}</h1>
        <p className="text-[16px] md:text-[16px] font-[400] leading-[24px] text-Grey">{paragraph}</p>
    </div>
  )
}

export default FormHeader