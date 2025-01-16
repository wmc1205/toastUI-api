let dps = {
    CMMERRMSG : "통신이 원활하지 않습니다. 잠시후 다시 시도해주세요."
};
dps.Ajax = {
    initGrid : function(url, initparam) {
        const Grid = tui.Grid;
        Grid.applyTheme('stripe');
        /**
         * 그리드 설정
         * @variable {Dom} el : 그리드 element(DOM)
         * @variable {boolean} scrollX : X 스크롤 사용여부
         * @variable {boolean} scrollY : Y 스크롤 사용여부
         * @variable {boolean} draggable : 드레그 사용 여부
         * @variable {Object} header
         *      - @variable {Number} height : 헤더 높이
         * @variable {Number} bodyHeight : 그리드 바디 높이
         * @variable {*} contextMenu : 마우스 우클릭 옵션
         * @variable {Array} columns :
         *      - @variable {String} header : 컬럼명(헤더)
         *      - @variable {String} name : 컬럼 name (input data와 이름이 일치해야함)
         *      - @variable {String} align : 정렬
         *      - @variable {Number} width : 너비
         *      - @variable {String} whiteSpace : 줄바꿈 설정
         *      - @variable {Function} formatter : 출력 포멧
         */
        let dataSource = {
            initialRequest: true,
            api: {
                readData: {
                    url: url,      // 서버 URL
                    method: 'GET',           // HTTP 메서드
                }
            },
        }
        let grid = new Grid({
            el: document.getElementById('grid'),
            data: dataSource,
            scrollX: false,
            scrollY: false,
            columns: [
                {header: 'ID', name: 'id', sortable: true},
                {header: 'Name', name: 'name', sortable: true},
                {header: 'Email', name: 'email', sortable: true},
                {header: 'Gender', name: 'gender', sortable: true},
                {header: 'Age', name: 'age', sortable: true},
                {header: 'Hobby', name: 'hobby', sortable: true}
            ],
            summary: {
                height: 40,
                position: 'bottom',
                columnContent: {
                    userHobby: {
                        template: (valueMap) => {
                            return `사용자 합계 : ${valueMap.cnt}`
                        }
                    }
                }
            },
            pageOptions: {
                perPage: 20
            },
        });
        // 검색 버튼 이벤트 리스너
        document.getElementById('searchButton').addEventListener('click', () => {
            debugger
            const keyword = document.getElementById('searchInput').value.trim();
            grid.readData(1, {keyword}); // 검색어와 함께 첫 페이지 데이터 요청
        });

        grid.on('response',(event)=>{
            const data = JSON.parse(event.xhr.responseText);
            console.log(event.xhr.responseText);
        });

    },
    /**
     * Toast UI Editor 작성
     *
     * @param {string} selector - 에디터를 렌더링할 DOM 선택자
     * @param {Object} options - 에디터에 적용될 옵션
     * [options]
     * el : 에디터가 렌더링될 DOM 요소
     * previewStyle : 미리보기 스타일('vertical','tab')
     * height : 에디터의 높이
     * initialEditType : 초기 편집 모드(markdown 또는 wysiwyg)
     * initialValue : 에디터에 로드될 초기 내용
     * toolbarItems : 툴바에 표시할 도구 목록
     * placeholder : 에디터 입력 없을 시 표시될 텍스트
     * hooks : 특정 이벤트에서 실행할 사용자 정의 함수
     * language : 에디터의 언어 설정(ko,en ..)
     * viewer : 에디터를 읽기 전용 뷰어로 설정
     * events : 에디터에서 발생하는 이벤트를 처리할 리스너
     * useCommandShortcut : 명령어 단축키 사용 여부
     */
    createEditor : function(selector, options){
        const defaultOptions = {
            el: document.querySelector(selector), // 에디터를 렌더링할 DOM 선택자
            previewStyle: 'vertical',
            height: '500px',
            initialValue: '',
            placeholder: '내용을 입력해 주세요',
            toolbarItems: [
                ['heading', 'bold', 'italic', 'strike'],
                ['hr', 'quote'],
                ['ul', 'ol', 'task', 'indent', 'outdent'],
                ['table', 'image', 'link'],
                ['code', 'codeblock'],
                ['scrollSync'],
            ],
            hooks: {
                async addImageBlobHook(blob, callback) {
                    try {
                        const formData = new FormData();
                        formData.append('image', blob);
                        const response = await fetch('/api/image-upload', {
                            method: 'POST',
                            body: formData,
                        });
                        const filename = await response.text();
                        console.log('서버에 저장된 파일명 : ', filename);

                        const imageUrl = `/api/image-print?filename=${filename}`;
                        callback(imageUrl, 'image alt attribute');
                    } catch (error) {
                        console.error('업로드 실패 : ' + error);
                    }
                },
            },
        };

        // 사용자 정의 옵션과 기본 옵션을 병합( 우선 순위 : options > defaultOptions )
        const mergedOptions = { ...defaultOptions, ...options };
        // 에디터 생성
        return new toastui.Editor(mergedOptions);
    }
}


