function arrayToTree(serviceOperationsArray, rootId = -1) {
    const dataClone = serviceOperationsArray.slice(0);
    const tree = [];
    // console.log('i==1==', i)

    for (let i = 0; i < dataClone.length; i += 1) {
        console.log('i==1==', i)
        if (dataClone[i].parentId === rootId) {
            tree.push({
                // ...dataClone[i],
                // ...{ children: dataClone[i].children ? dataClone[i].children : [] },
            });
            dataClone.splice(i, 1); // 如果没有，则会无限循环
            console.log('i=2===', i)
            i -= 1;
            console.log('i==3==', i)
        }
        console.log('i==4==', i)
    }
}

arrayToTree([{parentId: -1}, {}], -1)
