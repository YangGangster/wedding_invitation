import { useEffect } from 'react';

export default function KakaoMap() {
    useEffect(() => {
        if (document.getElementById('kakao-map-script')) {
            if (window.kakao && window.kakao.maps) {
                loadMap();
            }
            return;
        }
        const loadMap = () => {

            console.log('loadMap 실행됨');
            const container = document.getElementById('map');
            console.log('container:', container);
            const options = {
                center: new window.kakao.maps.LatLng(37.5665, 126.9780),
                level: 3,
            };
            const map = new window.kakao.maps.Map(container, options);

            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(37.5665, 126.9780),
            });
            marker.setMap(map);
        };

        console.log('window.kakao:', window.kakao);

        if (window.kakao && window.kakao.maps) {
            console.log('이미 로드됨');
            loadMap();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=382907188b0cdd8a9b44690aeff0972a&autoload=false`;
        console.log('스크립트 추가:', script.src);
        script.onload = () => {
            console.log('스크립트 로드 완료');
            window.kakao.maps.load(loadMap);
        };
        script.onerror = (e) => {
            console.log('스크립트 로드 실패:', e); // 이거 뜨는지 확인
        };
        document.head.appendChild(script);

    }, []);

    return <div id="map" style={{ width: '100%', height: '300px' }} />;
}