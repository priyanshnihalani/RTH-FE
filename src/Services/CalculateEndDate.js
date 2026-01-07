const calculateEndDate = (joinedDate, duration) => {
    const startDate = new Date(joinedDate);
    const endDate = new Date(startDate);

    if (duration.includes("Days")) {
        const days = Number(duration.match(/\d+/)[0]);
        endDate.setDate(endDate.getDate() + days);
    }

    if (duration.includes("months")) {
        const months = Number(duration.match(/\d+/)[0]);
        endDate.setMonth(endDate.getMonth() + months);
    }

    const yyyy = endDate.getFullYear();
    const mm = String(endDate.getMonth() + 1).padStart(2, "0");
    const dd = String(endDate.getDate()).padStart(2, "0");

    return {
        datepicker: `${yyyy}-${mm}-${dd}`,
        displaydate: `${dd}-${mm}-${yyyy}`
    };
};

export default calculateEndDate;
