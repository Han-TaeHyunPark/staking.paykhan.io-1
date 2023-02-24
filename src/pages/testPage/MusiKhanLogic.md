1. 200개의 토큰 리스트를 보여줘야하는데 어떻게 가져올 것인가?  
   backend에 200개의 토큰 정보를 저장 한 후 가져온다.
   전부다 하드코딩으로 만든다.
2. 토큰 리스트를 가져오더라도 유저가 가지고 있는 토큰을 확인하려면 어디 데이터를 가져와야하나
3. 토큰 리스트를 200개 다 찍어서 유저가 가진 토큰의 balance를 비교해서 제일 위로 올린다.
4. Modal창에 토큰 리스트에 대한 정보를 눌렀을때 페이지에 어떻게 띄어줘야하나.
   답: redux에 상태를 저장하던가 onClick했을때 변수들의 값을 넘긴다.
5. 200개의 토큰 list ca는 가져오더라도 각 토큰의 balanceof를 찍어주려면 각각 다른 토큰의 contract주소를 보내줘야하는데 어떻게 보내줘야하나.
6. // TokenApporve함수 200개
   const qwerApprove = await qwerContract.methods
   .approve(BridgeAddress, qwerBalanceOf)
   .send({ from: account });
   이런식으로 Apporve하기위한

    // Approve실행 함수 200개
    const testApprove = () => {
    dispatch(L1TokenApproveAction.L1TokenApproveAct(account, qwerBalanceOf));
    };

토큰 리스트에서 선택후 그 선택한 토큰 CA와 tokenbalance를 넘겨줘서 apporve 하게끔 해준다.
토큰 리스트에서 유저가 그 토큰에 대한 balance를 얼마나 가지고 있는지 어떻게 확인하나? > const qwerBalanceOfApi = await qwerContract.methods
.balanceOf(account)
.call();
