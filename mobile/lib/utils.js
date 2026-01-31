// step511: we want to format the ugly date present in MongoDB database like createdAt : 2026-01-29T20:38:32.844+00:00 ; we now want to make it look more presentable, thus here below.
export function formatMemberSince(dateString){
    // step512: we now here below converts the date string from MongoDB into a JavaScript Date Object, so that we can extract month and year from it, thus here below.
    const date = new Date(dateString); 

    // step513: then we format the date to local fomrat using the below code ; we can get short abbreviations for months Jan. feb .. OR long too using date.toLocaleString("default", { month: "long" }); OR date.toLocaleString("en-IN"); to get : 30/01/2026, 10:45:12 pm and so on ...., thus here below.

    // step514: "default" means use the device's locale to format the date, thus here below.
    const month = date.toLocaleString("default", { month: "short" });

    // step515: then we extract the 4 digit year, thus here below.
    const year = date.getFullYear();

    // step516: finally return the following format i.e. "May 2023", thus here below.
    return `${month} ${year}`;
}

// step517: similalry we have the function to fomrat date in form of "May 15, 2023", thus here below.

// step518: see the next steps in index.jsx file now there, thus here below.
export function formatPublishDate(dateString){
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}