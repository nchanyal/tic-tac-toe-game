const Cell = function (){
    let value = 0;
    const getValue = () => value;
    const setValue = (playersMark) => value = playersMark;
    return {getValue, setValue};
};