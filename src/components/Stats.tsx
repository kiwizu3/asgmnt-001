const Stats = () => {

    return(
        <>
        <div className="d-flex justify-content-between w-75 mx-auto">
            <div>
                <h4 className="stat-title fw-stat">12 Months</h4>
                <p><img className="stat-img me-1" src="assets/icons/android-share.svg"/>Free Trial</p>
            </div>
            <div>
                <img className="stat-border" src="assets/icons/line-1.svg" alt="" />
            </div>
            <div>
                <h4 className="stat-title fw-stat">+80M</h4>
                <p><img className="stat-img me-1" src="assets/icons/person-stalker.svg"/>Active Users</p>
            </div>
            <div>
                <img className="stat-border" src="assets/icons/line-1.svg" alt="" />
            </div>
            <div>
                <h4 className="stat-title fw-stat">+180K</h4>
                <p><img className="stat-img me-1" src="assets/icons/social-buffer.svg"/>Providers</p>
            </div>
        </div>
        </>
    )
}
export default Stats;   