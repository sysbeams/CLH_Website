const SubHeading = ({text, colourText}) => {
    return (
        <div className="custom-border p-[15px] md:p-[30px] text-primary">
            <span className="text-[36px] md:text-[48px] font-[600] leading-[44px] md:leading-[52px]">{text} <span className="text-secondary">{colourText}</span></span>
        </div>
    );
}

export default SubHeading;