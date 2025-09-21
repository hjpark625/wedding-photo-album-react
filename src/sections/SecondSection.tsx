function SecondSection() {
  return (
    <section className="section second">
      <div className="left-side">
        <p className="greeting-title">감사합니다.</p>
        <div className="main-image-box">
          <img
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            src="https://wedding-photos.hjpark625.site/5a0a0776-b36a-425b-a6bd-ae840aecd5db.jpeg"
            alt="number2"
            draggable="false"
          />
        </div>
      </div>

      <div className="right-side">
        <p className="thanks-paragraph text-box">
          바쁘신 와중에도 불구하고, 먼길 귀한 발걸음 해주시어 진심으로 감사드립니다. <br />
          보내주신 따뜻한 마음과 축복 덕분에 저희에게 소중한 하루가 되었습니다. <br />
          아름다운 순간을 사진에 담아주신 하객여러분들의 편의를 드리고자 사진을 업로드 할 수 있는 홈페이지를 개설하여
          공유드립니다. <br />
          이곳에 사진 업로드를 부탁드리며, 다른 곳으로의 무단 배포 및 공유는 개인정보보호법에 따른 문제가 제기될 수
          있사오니 이 점 유의부탁드립니다. <br />
          다시 한 번 함께해주신 모든 분들께 감사드리며 보내주신 응원에 힘입어 행복한 가정 만들어가겠습니다.
        </p>
        <div className="sub-image-container">
          <div className="sub-image-box">
            <img
              src="https://wedding-photos.hjpark625.site/bdd562d4-56ae-41a1-812c-1740f5ad3a4a.jpeg"
              alt="sub-image-1"
              draggable="false"
            />
          </div>
          <div className="sub-image-box">
            <img
              src="https://wedding-photos.hjpark625.site/6867199c-d6f3-42ac-86e2-3f5deaedfea7.jpeg"
              alt="sub-image-2"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SecondSection
