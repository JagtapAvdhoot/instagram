export function compareAndUpdateArray(arrayOne, arrayTwo, comparator) {
  let updatedArray = [...arrayOne]; // Create a copy of arrayOne

  for (let i = 0; i < arrayTwo.length; i++) {
    let duplicateIndex = updatedArray.findIndex(
      (item) => item[comparator] === arrayTwo[i][comparator]
    );

    if (duplicateIndex !== -1) {
      // updatedArray[duplicateIndex] = { ...arrayTwo[i] }; // Update the object in the updated array
      updatedArray[duplicateIndex] = arrayTwo[i]; // Update the object in the updated array
    } else {
      updatedArray.push(arrayTwo[i]); // Add non-duplicate objects to the updated array
    }
  }

  return updatedArray;
}

export function isTokenExpired(token) {
  if (!token) {
    return true;
  }

  const tokenParts = token.split(".");
  if (tokenParts.length !== 3) {
    return true;
  }

  const payload = JSON.parse(atob(tokenParts[1]));
  if (!payload.exp || typeof payload.exp !== "number") {
    return true;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  return payload.exp < currentTimestamp;
}
