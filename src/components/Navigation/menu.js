export const menuData = [
  {
    title: "마이페이지",
    link: "/point",
    sub: [
      {
        subTitle: "마일리지",
        subLink: "/point",
      },
      {
        subTitle: "주문내역",
        subLink: "/order-detail",
      },
      {
        subTitle: "사업자등록증",
        subLink: "/certification",
      },
      {
        subTitle: "그린리모델링 신청내역",
        subLink: "/history",
      },
      {
        subTitle: "녹색제품 인증",
        subLink: "/green-certification",
      },
      {
        subTitle: "녹색제품 등록내역",
        subLink: "/show-green-certification",
      },
      {
        subTitle: "회원정보수정",
        subLink: "/checkpw2",
      },
      {
        subTitle: "배송지관리",
        subLink: "/checkpw",
      }
    ],
  },

  {
    title: "스토어",
    link: "/green-product ",
    sub: [
      {
        subTitle: "녹색제품",
        subLink: "/green-product",
      },
      {
        subTitle: "에너지 효율 1등급 제품",
        subLink: "/green-energy-product",
      },
    ],
  },

  {
    title: "그린리모델링",
    link: "/remodeling-request",
    sub: [
      {
        subTitle: "그린리모델링 신청",
        subLink: "/remodeling-request",
      },
      {
        subTitle: "그린리모델링 내역",
        subLink: "/remodeling-list",
      },
    ],
  },
  {
    title: "관리자 페이지",
    link:"/admin",
    sub: [
      {
        subTitle: "사업실적",
        subLink: "/performance",
      },{
        subTitle: "그린리모델링 예측",
        subLink: "/forecast",
      },{
        subTitle: "리뷰관리",
        subLink:"/management",
      },
    ],
    adminOnly:true,
  },
];
