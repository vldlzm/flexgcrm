document.addEventListener('DOMContentLoaded', function () {
  setCampaignNameDefault();
  var activeItem = document.querySelector('.screen-item.active');
  if (activeItem && activeItem.getAttribute('data-screen') !== 'coupon-create') {
    activeItem.classList.add('active');
  }
  renderCouponListTable(couponListData.crm);
  updateListCount(couponListData.crm.length);
});

/* ===========================
   화면 선택 (좌측 인덱스)
=========================== */
function selectScreen(el) {
  var screenId = el.getAttribute('data-screen');

  // 쿠폰 생성 팝업이 열려 있으면 닫기
  var ccBackdrop = document.getElementById('ccPopupBackdrop');
  if (ccBackdrop) ccBackdrop.classList.remove('open');

  // 쿠폰 생성은 팝업으로 처리
  if (screenId === 'coupon-create') {
    openCcPopup();
    return;
  }

  // 인덱스 활성화
  document.querySelectorAll('.screen-item').forEach(function (item) {
    item.classList.remove('active');
  });
  el.classList.add('active');

  // 중앙 화면 전환
  document.querySelectorAll('.screen-view').forEach(function (view) {
    view.classList.remove('active');
  });
  var target = document.getElementById('screen-' + screenId);
  if (target) target.classList.add('active');

  // 우측 설명 전환
  document.querySelectorAll('.desc-section').forEach(function (sec) {
    sec.classList.remove('active');
  });
  var desc = document.getElementById('desc-' + screenId);
  if (desc) desc.classList.add('active');
}

/* ===========================
   통계 팝업
=========================== */
function openStatsPopup() {
  document.getElementById('statsBackdrop').classList.add('open');
}

/* ===========================
   캠페인 조회 팝업 (수정 불가)
=========================== */
function openCampaignViewPopup(name, period) {
  document.getElementById('cvCampaignName').value = name || '';
  document.getElementById('cvCampaignPeriod').value = period || '';
  document.getElementById('campaignViewBackdrop').classList.add('open');
}

function closeCampaignViewPopup() {
  document.getElementById('campaignViewBackdrop').classList.remove('open');
}

/* ===========================
   테스트 생성 팝업
=========================== */
function openTestPublishPopup() {
  document.getElementById('testPublishBackdrop').classList.add('open');
}

function closeTestPublishPopup() {
  document.getElementById('testPublishBackdrop').classList.remove('open');
}

/* ===========================
   발송 내역 팝업
=========================== */
function openSendHistPopup() {
  document.getElementById('sendHistBackdrop').classList.add('open');
}

function closeSendHistPopup() {
  document.getElementById('sendHistBackdrop').classList.remove('open');
}

function switchShTab(btn) {
  var tabs = btn.closest('.sh-tabs').querySelectorAll('.sh-tab');
  tabs.forEach(function(t) { t.classList.remove('sh-tab-active'); });
  btn.classList.add('sh-tab-active');
}

function closeStatsPopup() {
  document.getElementById('statsBackdrop').classList.remove('open');
}

/* ===========================
   CRM 지표 브리핑 메시지 샘플 레이어
=========================== */
function openCrmSample(btn) {
  var layer = document.getElementById('crmSampleLayer');
  var backdrop = document.getElementById('crmSampleBackdrop');
  if (layer.style.display !== 'none') { closeCrmSample(); return; }
  var rect = btn.getBoundingClientRect();
  layer.style.display = 'block';
  var lw = layer.offsetWidth;
  var lh = layer.offsetHeight;
  var left = rect.right + 8;
  var top = rect.top;
  if (left + lw > window.innerWidth - 8) left = rect.left - lw - 8;
  if (top + lh > window.innerHeight - 8) top = window.innerHeight - lh - 8;
  layer.style.left = left + 'px';
  layer.style.top = Math.max(8, top) + 'px';
  backdrop.classList.add('active');
}

function closeCrmSample() {
  document.getElementById('crmSampleLayer').style.display = 'none';
  document.getElementById('crmSampleBackdrop').classList.remove('active');
}

function switchStatsTab(btn) {
  document.querySelectorAll('.stats-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
}

function setStatsPeriod(type) {
  var end = new Date();
  var start = new Date();
  if (type === 'yesterday') { start.setDate(start.getDate()-1); end.setDate(end.getDate()-1); }
  else if (type === 'all') { start = new Date('2020-01-01'); }
  else { start.setDate(start.getDate() - parseInt(type)); }
  document.getElementById('statsStartDate').value = start.toISOString().slice(0,10);
  document.getElementById('statsEndDate').value = end.toISOString().slice(0,10);
}

function resetStatsSearch() {
  document.getElementById('statsStartDate').value = '2025-12-20';
  document.getElementById('statsEndDate').value = '2025-12-20';
}

function searchStats() {
  console.log('[통계 검색]', document.getElementById('statsStartDate').value, '~', document.getElementById('statsEndDate').value);
}

function openCcPopup() {
  var popup = document.getElementById('ccPopupBackdrop');
  popup.classList.remove('cc-view-only');
  popup.querySelectorAll('input, select, textarea, button:not(.cc-close-btn):not(.popup-close)').forEach(function(el) {
    el.disabled = false;
  });
  popup.classList.add('open');
}

function openCcPopupViewOnly() {
  var popup = document.getElementById('ccPopupBackdrop');
  var nameInput = document.getElementById('ccCouponName');
  if (nameInput) nameInput.value = '이미 등록된 쿠폰';
  popup.classList.add('open', 'cc-view-only');
  popup.querySelectorAll('input, select, textarea').forEach(function(el) {
    el.disabled = true;
  });
  popup.querySelectorAll('button').forEach(function(el) {
    if (!el.classList.contains('cc-close-btn') && !el.closest('.popup-header')) {
      el.disabled = true;
    }
  });
}

function closeCcPopup() {
  var popup = document.getElementById('ccPopupBackdrop');
  popup.classList.remove('open', 'cc-view-only');
  popup.querySelectorAll('input, select, textarea, button').forEach(function(el) {
    el.disabled = false;
  });
}

function saveCcPopup() {
  console.log('[쿠폰 생성 저장]', document.getElementById('ccCouponName').value);
  closeCcPopup();
}

/* ===========================
   캠페인명 기본값
=========================== */
function setCampaignNameDefault() {
  var today = new Date();
  var y = today.getFullYear();
  var m = String(today.getMonth() + 1).padStart(2, '0');
  var d = String(today.getDate()).padStart(2, '0');
  var el = document.getElementById('campaignName');
  if (el && !el.value) {
    el.value = '오늘 소멸되는 쿠폰 알림 보내기_' + y + m + d + '_1';
  }
}

/* ===========================
   캠페인 내용 타입 토글
=========================== */
function onContentTypeChange(radio) {
  document.getElementById('couponArea').style.display = radio.value === 'coupon' ? 'block' : 'none';
  document.getElementById('discountArea').style.display = radio.value === 'discount' ? 'block' : 'none';
  document.getElementById('productArea').style.display = radio.value === 'product' ? 'block' : 'none';
}

function findCoupon() {
  document.getElementById('couponBackdrop').classList.add('open');
  document.getElementById('couponSearchInput').value = '';
  renderCouponTable(couponData);
}

function closeCouponPopup() {
  document.getElementById('couponBackdrop').classList.remove('open');
}

var couponData = [
  { name: '할인쿠폰비율',                    period: '무제한', type: '비율 할인', rate: '10% 할인', dl: '한번만 다운로드 가능' },
  { name: '여행시작',                         period: '무제한', type: '비율 할인', rate: '10% 할인', dl: '한번만 다운로드 가능' },
  { name: '린 테스트 +',                      period: '무제한', type: '비율 할인', rate: '80% 할인', dl: '사용 후 다시 다운로드' },
  { name: '굳쿠폰',                           period: '무제한', type: '비율 할인', rate: '10% 할인', dl: '한번만 다운로드 가능' },
  { name: '짱쿠폰',                           period: '무제한', type: '비율 할인', rate: '20% 할인', dl: '한번만 다운로드 가능' },
  { name: '(복사)윤쿠폰',                     period: '무제한', type: '비율 할인', rate: '20% 할인', dl: '사용 후 다시 다운로드' },
  { name: '(복사)윤쿠폰',                     period: '무제한', type: '비율 할인', rate: '20% 할인', dl: '한번만 다운로드 가능' },
  { name: '윤쿠폰',                           period: '무제한', type: '비율 할인', rate: '20% 할인', dl: '한번만 다운로드 가능' },
  { name: '최대할인금액 테스트(최대금액 없음)', period: '무제한', type: '비율 할인', rate: '90% 할인', dl: '한번만 다운로드 가능' },
  { name: '최대할인금액 테스트',               period: '무제한', type: '비율 할인', rate: '90% 할인', dl: '한번만 다운로드 가능' }
];

function renderCouponTable(data) {
  var tbody = document.getElementById('couponTableBody');
  tbody.innerHTML = data.map(function(c) {
    return '<tr>' +
      '<td class="ct-td ct-name"><span class="cpn-name">' + c.name + '</span><br><span class="cpn-period">' + c.period + '</span></td>' +
      '<td class="ct-td ct-center"><span class="cpn-type">' + c.type + '</span><br><span class="cpn-rate">' + c.rate + '</span></td>' +
      '<td class="ct-td ct-center">' + c.dl + '</td>' +
      '<td class="ct-td ct-center"><button type="button" class="btn-select" onclick="selectCoupon(this, \'' + c.name + '\')">' + '선택</button></td>' +
      '</tr>';
  }).join('');
}

function searchCoupon() {
  var keyword = document.getElementById('couponSearchInput').value.trim();
  if (!keyword) {
    renderCouponTable(couponData);
    return;
  }
  var filtered = couponData.filter(function(c) {
    return c.name.indexOf(keyword) !== -1;
  });
  renderCouponTable(filtered);
}

function resetCouponSearch() {
  document.getElementById('couponSearchInput').value = '';
  renderCouponTable(couponData);
}

function selectCoupon(btn, name) {
  document.getElementById('couponSearchInput').value = '';
  closeCouponPopup();
  console.log('[쿠폰 선택]', name);
}

function generateDiscountCode() {
  var code = 'CRM' + Math.random().toString(36).toUpperCase().slice(2, 8);
  console.log('[할인코드 생성]', code);
}

/* ===========================
   대상자
=========================== */
function onTargetChange(radio) {
  var btn = document.getElementById('memberQueryBtn');
  btn.textContent = radio.value === 'all' ? '전체 회원 조회 ›' : '특정 고객 조회 ›';
  document.getElementById('memberCount').textContent = '0명';
}

function queryMembers() {
  var target = document.querySelector('input[name="target"]:checked');
  if (target && target.value === 'all') {
    document.getElementById('memberCount').textContent = '전체';
  } else {
    console.log('[특정 고객 필터 설정]');
  }
}

/* ===========================
   캠페인 유형 뱃지
=========================== */
function onBadgeChange(checkbox, badgeId) {
  var badge = document.getElementById(badgeId);
  checkbox.checked ? badge.classList.add('active') : badge.classList.remove('active');
}

/* ===========================
   캠페인 기간 (커스텀 피커)
=========================== */
var _cp = {
  year: 0, month: 0,
  selYear: 0, selMonth: 0, selDay: 0,
  selHour: 9, selMin: 0
};

function openCampaignPicker() {
  var picker = document.getElementById('campaignPicker');
  if (picker.style.display !== 'none') { closeCampaignPicker(); return; }
  var now = new Date();
  _cp.year = now.getFullYear();
  _cp.month = now.getMonth();
  if (!_cp.selDay) {
    _cp.selYear = _cp.year;
    _cp.selMonth = _cp.month;
    _cp.selDay = now.getDate();
    _cp.selHour = 9;
    _cp.selMin = 0;
  }
  cpInitSelects();
  cpRenderCalendar();
  cpRenderTimes();
  picker.style.display = 'block';
  setTimeout(function() {
    document.addEventListener('click', cpOutsideClick);
  }, 0);
}

function closeCampaignPicker() {
  var picker = document.getElementById('campaignPicker');
  if (picker) picker.style.display = 'none';
  document.removeEventListener('click', cpOutsideClick);
  cpUpdateInput();
}

function cpOutsideClick(e) {
  var picker = document.getElementById('campaignPicker');
  var input = document.getElementById('campaignPeriod');
  if (picker && !picker.contains(e.target) && e.target !== input) {
    closeCampaignPicker();
  }
}

function cpInitSelects() {
  var mSel = document.getElementById('cpMonthSel');
  var ySel = document.getElementById('cpYearSel');
  var months = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
  mSel.innerHTML = '';
  months.forEach(function(m, i) {
    var o = document.createElement('option');
    o.value = i; o.textContent = m;
    if (i === _cp.month) o.selected = true;
    mSel.appendChild(o);
  });
  ySel.innerHTML = '';
  var curY = new Date().getFullYear();
  for (var y = curY - 2; y <= curY + 3; y++) {
    var o = document.createElement('option');
    o.value = y; o.textContent = y + '년';
    if (y === _cp.year) o.selected = true;
    ySel.appendChild(o);
  }
}

function cpGoToSelected() {
  _cp.month = parseInt(document.getElementById('cpMonthSel').value);
  _cp.year = parseInt(document.getElementById('cpYearSel').value);
  cpRenderCalendar();
}

function cpRenderCalendar() {
  var container = document.getElementById('cpDays');
  container.innerHTML = '';
  var today = new Date();
  var firstDay = new Date(_cp.year, _cp.month, 1).getDay();
  var daysInMonth = new Date(_cp.year, _cp.month + 1, 0).getDate();
  for (var i = 0; i < firstDay; i++) {
    var blank = document.createElement('div');
    blank.className = 'cp-day cp-empty';
    container.appendChild(blank);
  }
  for (var d = 1; d <= daysInMonth; d++) {
    var el = document.createElement('div');
    el.className = 'cp-day';
    el.textContent = d;
    var isToday = (d === today.getDate() && _cp.month === today.getMonth() && _cp.year === today.getFullYear());
    var isSel = (d === _cp.selDay && _cp.month === _cp.selMonth && _cp.year === _cp.selYear);
    if (isSel) el.classList.add('cp-selected');
    else if (isToday) el.classList.add('cp-today');
    (function(day) {
      el.addEventListener('click', function(e) { e.stopPropagation(); cpSelectDay(day); });
    })(d);
    container.appendChild(el);
  }
  document.getElementById('cpMonthSel').value = _cp.month;
  document.getElementById('cpYearSel').value = _cp.year;
}

function cpRenderTimes() {
  var container = document.getElementById('cpTimes');
  container.innerHTML = '';
  for (var h = 0; h < 24; h++) {
    [0, 30].forEach(function(m) {
      var el = document.createElement('div');
      el.className = 'cp-time';
      var hStr = (h < 10 ? '0' : '') + h;
      var mStr = m === 0 ? '00' : '30';
      el.textContent = hStr + ':' + mStr;
      if (h === _cp.selHour && m === _cp.selMin) el.classList.add('cp-time-selected');
      (function(hour, min) {
        el.addEventListener('click', function(e) { e.stopPropagation(); cpSelectTime(hour, min); });
      })(h, m);
      container.appendChild(el);
    });
  }
  cpScrollToSelected();
}

function cpScrollToSelected() {
  var container = document.getElementById('cpTimes');
  var selIdx = _cp.selHour * 2 + (_cp.selMin === 30 ? 1 : 0);
  var items = container.querySelectorAll('.cp-time');
  if (items[selIdx]) {
    var itemH = items[selIdx].offsetHeight || 35;
    container.scrollTop = selIdx * itemH - itemH;
  }
}

function cpScrollTime(dir) {
  var container = document.getElementById('cpTimes');
  var items = container.querySelectorAll('.cp-time');
  var itemH = items.length > 0 ? (items[0].offsetHeight || 35) : 35;
  container.scrollTop += dir * itemH * 3;
}

function cpSelectDay(day) {
  _cp.selYear = _cp.year;
  _cp.selMonth = _cp.month;
  _cp.selDay = day;
  cpRenderCalendar();
}

function cpSelectTime(hour, min) {
  _cp.selHour = hour;
  _cp.selMin = min;
  cpRenderTimes();
}

function cpUpdateInput() {
  if (!_cp.selDay) return;
  var y = _cp.selYear;
  var mo = (_cp.selMonth + 1 < 10 ? '0' : '') + (_cp.selMonth + 1);
  var d = (_cp.selDay < 10 ? '0' : '') + _cp.selDay;
  var h = (_cp.selHour < 10 ? '0' : '') + _cp.selHour;
  var m = _cp.selMin === 0 ? '00' : '30';
  document.getElementById('campaignPeriod').value = y + '-' + mo + '-' + d + ' ' + h + ':' + m;
}

function cpPrevMonth() {
  _cp.month--;
  if (_cp.month < 0) { _cp.month = 11; _cp.year--; }
  cpInitSelects();
  cpRenderCalendar();
}

function cpNextMonth() {
  _cp.month++;
  if (_cp.month > 11) { _cp.month = 0; _cp.year++; }
  cpInitSelects();
  cpRenderCalendar();
}

function resetPeriod() {
  document.getElementById('campaignPeriod').value = '';
  _cp.selDay = 0;
  var picker = document.getElementById('campaignPicker');
  if (picker) picker.style.display = 'none';
  document.removeEventListener('click', cpOutsideClick);
}

/* ===========================
   클릭 액션
=========================== */
function loadAction() {
  console.log('[클릭 액션 불러오기]');
}

function resetAction() {
  document.getElementById('clickAction').value = '/Home/Index';
}

/* ===========================
   저장 / 취소
=========================== */
function testCampaign() {
  console.log('[테스트 발행]', document.getElementById('campaignName').value);
}

function publishCampaign() {
  var name = document.getElementById('campaignName').value.trim();
  if (!name) {
    document.getElementById('campaignName').focus();
    return;
  }
  var period = document.getElementById('campaignPeriod').value.trim();
  if (!period) return;
  var types = document.querySelectorAll('input[name="campaignType"]:checked');
  if (types.length === 0) return;
  console.log('[캠페인 발행]', name);
}

function saveCampaign() {
  var name = document.getElementById('campaignName').value.trim();
  console.log('[캠페인 저장]', name);
}

function editLmsMessage() {
  console.log('[LMS] 메시지 수정 모드');
}

function cancelCampaign() {
  document.getElementById('campaignName').value = '';
  setCampaignNameDefault();
  document.querySelector('input[name="classification"][value="message"]').checked = true;
  document.querySelector('input[name="contentType"][value="coupon"]').checked = true;
  document.querySelector('input[name="target"][value="all"]').checked = true;
  document.getElementById('couponArea').style.display = 'block';
  document.getElementById('discountArea').style.display = 'none';
  document.getElementById('productArea').style.display = 'none';
  document.getElementById('memberCount').textContent = '0명';
  document.getElementById('memberQueryBtn').textContent = '전체 회원 조회 ›';
  resetPeriod();
  resetAction();
}

/* ===========================
   쿠폰 목록 화면
=========================== */
var couponListData = {
  normal: [
    { no: 3, status: '사용', name: '오늘',           benefit: '비율 할인', rate: '5 %',     period: '무제한', issued: '0 / 제한없음', orderLimit: '제한없음', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '사용 후 다시 다운로드',   birthday: false, welcome: false, regDate: '2025-12-24 20:38:08' },
    { no: 2, status: '사용', name: '휴',             benefit: '비율 할인', rate: '3 %',     period: '무제한', issued: '0 / 제한없음', orderLimit: '제한없음', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '다운로드 불가',           birthday: false, welcome: false, regDate: '2025-12-24 20:37:20' },
    { no: 1, status: '사용', name: 'oooooooooooo',   benefit: '금액 할인', rate: '100 원',  period: '무제한', issued: '0 / 제한없음', orderLimit: '제한없음', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '한번만 다운로드 가능',     birthday: false, welcome: false, regDate: '2025-02-04 14:42:55' }
  ],
  crm: [
    { no: 2, status: '사용', name: 'CRM 할인쿠폰',   benefit: '비율 할인', rate: '10 %',    period: '2026-05-12 ~ 2026-05-12', issued: '0 / 제한없음', orderLimit: '제한없음', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '다운로드 불가',   birthday: false, welcome: false, regDate: '2026-01-15 10:20:00' },
    { no: 1, status: '사용', name: 'CRM 맞춤 쿠폰',  benefit: '금액 할인', rate: '5,000 원',period: '2026-05-12 ~ 2026-05-12', issued: '0 / 제한없음', orderLimit: '10,000원 이상', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '다운로드 불가', birthday: false, welcome: false, regDate: '2026-01-10 09:00:00' }
  ]
};

var currentGuBun = 'crm';

function onGuBunChange(radio) {
  currentGuBun = radio.value;
  renderCouponListTable(couponListData[currentGuBun]);
  updateListCount(couponListData[currentGuBun].length);
}

function renderCouponListTable(data) {
  var tbody = document.getElementById('clTableBody');
  if (!tbody) return;
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td class="cl-td" colspan="15" style="padding:30px;color:#94a3b8;">조회된 쿠폰이 없습니다.</td></tr>';
    return;
  }
  tbody.innerHTML = data.map(function(c) {
    return '<tr>' +
      '<td class="cl-td"><input type="checkbox" class="row-check"></td>' +
      '<td class="cl-td">' + c.no + '</td>' +
      '<td class="cl-td">' + c.status + '</td>' +
      '<td class="cl-td"><span class="cl-gubun-badge">CRM</span></td>' +
      '<td class="cl-td cl-td-name"><a class="cl-coupon-link" onclick=\'openCouponViewPopup(' + JSON.stringify(c) + ')\'>' + c.name + '</a></td>' +
      '<td class="cl-td">캠페인명</td>' +
      '<td class="cl-td" style="font-size:12px;color:#555;">시작 : 2026-05-11 23:00</td>' +
      '<td class="cl-td">' + c.benefit + '<br><span class="cl-rate">' + c.rate + '</span></td>' +
      '<td class="cl-td">' + c.period + '</td>' +
      '<td class="cl-td">' + c.orderLimit + '</td>' +
      '<td class="cl-td" style="font-size:11px;color:#718096;">' + c.regDate + '</td>' +
      '<td class="cl-td"><div class="cl-mgmt-btns">' +
        (currentGuBun === 'crm' && c.no === 1
          ? '<button class="btn-del" onclick="openCoupon1DeleteConfirm(this)">삭제 <span class="del-label-badge">1</span></button>'
          : currentGuBun === 'crm' && c.no === 2
          ? '<button class="btn-del" onclick="openCouponDeleteAlert()">삭제 <span class="del-label-badge">2</span></button>'
          : '<button class="btn-del" onclick="deleteCouponRow(this)">삭제</button>') +
      '</div></td>' +
      '</tr>';
  }).join('');
}

function makeToggle(isOn) {
  var on = isOn ? ' on' : '';
  return '<div class="cl-toggle-wrap">' +
    '<div class="toggle-row">' +
      '<span class="toggle-label">OFF</span>' +
      '<div class="toggle-track' + on + '" onclick="this.classList.toggle(\'on\')">' +
        '<div class="toggle-thumb"></div>' +
      '</div>' +
      '<span class="toggle-label">ON</span>' +
    '</div>' +
  '</div>';
}

function updateListCount(count) {
  var el = document.getElementById('clListCount');
  if (el) el.textContent = '전체 ' + count + '건 (페이지 1/1)';
}

function searchCouponList() {
  var keyword = document.getElementById('clCouponName').value.trim();
  var useYn = document.querySelector('input[name="clUseYn"]:checked').value;
  var benefitType = document.querySelector('input[name="clBenefitType"]:checked').value;
  var data = couponListData[currentGuBun];

  var filtered = data.filter(function(c) {
    var nameMatch = !keyword || c.name.indexOf(keyword) !== -1;
    var useMatch = useYn === 'all' || (useYn === 'use' && c.status === '사용') || (useYn === 'unused' && c.status !== '사용');
    var typeMatch = benefitType === 'all' || (benefitType === 'rate' && c.benefit === '비율 할인') || (benefitType === 'amount' && c.benefit === '금액 할인');
    return nameMatch && useMatch && typeMatch;
  });
  renderCouponListTable(filtered);
  updateListCount(filtered.length);
}

function resetCouponList() {
  document.getElementById('clCouponName').value = '';
  document.querySelector('input[name="clUseYn"][value="all"]').checked = true;
  document.querySelector('input[name="clBenefitType"][value="all"]').checked = true;
  renderCouponListTable(couponListData[currentGuBun]);
  updateListCount(couponListData[currentGuBun].length);
}

/* ===========================
   쿠폰 생성 화면 인터랙션
=========================== */
function onCcBenefitChange(radio) {
  var isRate = radio.value === 'rate';
  document.getElementById('ccRateVal').disabled = !isRate;
  document.getElementById('ccMaxDiscount').disabled = !isRate;
  document.getElementById('ccAmountVal').disabled = isRate;
}

function onCcPeriodChange(radio) {
  document.getElementById('ccStartDate').disabled = radio.value !== 'range';
  document.getElementById('ccEndDate').disabled = radio.value !== 'range';
  document.getElementById('ccFromIssueDays').disabled = radio.value !== 'fromissue';
}

function onCcIssueQtyChange(radio) {
  document.getElementById('ccQtyVal').disabled = radio.value !== 'limit';
}

function onCcGradeAll(checkbox) {
  document.querySelectorAll('.cc-grade-item').forEach(function(c) {
    c.checked = checkbox.checked;
  });
}

/* ===========================
   쿠폰 수정(조회) 팝업
=========================== */
function openCouponViewPopup(c) {
  // 사용 여부 토글
  var toggle = document.getElementById('viewUseYnToggle');
  if (c.status === '사용') toggle.classList.add('on');
  else toggle.classList.remove('on');

  // 쿠폰명
  document.getElementById('viewCouponName').value = c.name;

  // 해택 종류
  if (c.benefit === '비율 할인') {
    document.getElementById('viewBenefitRate').checked = true;
    document.getElementById('viewRateVal').value = c.rate.replace(' %', '');
    document.getElementById('viewMaxDiscount').value = '0';
    document.getElementById('viewAmountVal').value = '';
  } else {
    document.getElementById('viewBenefitAmount').checked = true;
    document.getElementById('viewAmountVal').value = c.rate.replace(' 원', '').replace(',', '');
    document.getElementById('viewRateVal').value = '';
    document.getElementById('viewMaxDiscount').value = '';
  }

  // 유효기간
  var parts = c.period.split(' ~ ');
  document.getElementById('viewStartDate').value = parts[0] || '';
  document.getElementById('viewEndDate').value = parts[1] || '';

  // 주문 금액 제한
  document.getElementById('viewMinOrder').value = c.orderLimit === '제한없음' ? '0' : c.orderLimit.replace(/[^0-9]/g, '');

  document.getElementById('couponViewBackdrop').classList.add('open');
}

function closeCouponViewPopup() {
  document.getElementById('couponViewBackdrop').classList.remove('open');
}

function toggleAllCheck(master) {
  document.querySelectorAll('.row-check').forEach(function(c) { c.checked = master.checked; });
}

function copyCouponRow(btn) { console.log('[쿠폰 복사]'); }
function editCouponRow(btn) { console.log('[쿠폰 수정]'); }
function deleteCouponRow(btn) { btn.closest('tr').remove(); }

function openCouponDeleteAlert() {
  document.getElementById('couponDeleteAlertBackdrop').classList.add('open');
}
function closeCouponDeleteAlert() {
  document.getElementById('couponDeleteAlertBackdrop').classList.remove('open');
}

var _coupon1DeleteBtn = null;
function openCoupon1DeleteConfirm(btn) {
  _coupon1DeleteBtn = btn;
  document.getElementById('coupon1DeleteConfirmBackdrop').classList.add('open');
}
function closeCoupon1DeleteConfirm() {
  document.getElementById('coupon1DeleteConfirmBackdrop').classList.remove('open');
  _coupon1DeleteBtn = null;
}
function confirmCoupon1Delete() {
  if (_coupon1DeleteBtn) _coupon1DeleteBtn.closest('tr').remove();
  closeCoupon1DeleteConfirm();
}

/* ===========================
   대상자 추출 설정 레이어
=========================== */
/* ===========================
   대시보드 탭
=========================== */
function dbSelectTab(el, type) {
  document.querySelectorAll('.db-tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
}

function openBannerTargetLayer() {
  document.getElementById('bannerTargetBackdrop').classList.add('open');
}
function closeBannerTargetLayer(e) {
  if (e && e.target !== document.getElementById('bannerTargetBackdrop')) return;
  document.getElementById('bannerTargetBackdrop').classList.remove('open');
}
