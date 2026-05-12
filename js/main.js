document.addEventListener('DOMContentLoaded', function () {
  setCampaignNameDefault();
  selectScreen(document.querySelector('.screen-item.active'));
  renderCouponListTable(couponListData.crm);
  updateListCount(couponListData.crm.length);
});

/* ===========================
   화면 선택 (좌측 인덱스)
=========================== */
function selectScreen(el) {
  // 인덱스 활성화
  document.querySelectorAll('.screen-item').forEach(function (item) {
    item.classList.remove('active');
  });
  el.classList.add('active');

  var screenId = el.getAttribute('data-screen');

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
   캠페인명 기본값
=========================== */
function setCampaignNameDefault() {
  var today = new Date();
  var y = today.getFullYear();
  var m = String(today.getMonth() + 1).padStart(2, '0');
  var d = String(today.getDate()).padStart(2, '0');
  var el = document.getElementById('campaignName');
  if (el && !el.value) {
    el.value = '맞춤 시나리오로 보내기_' + y + m + d + '_1';
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
  alert('할인코드가 생성되었습니다: ' + code);
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
    alert('특정 고객 필터를 설정합니다.');
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
   캠페인 기간
=========================== */
function openPeriodPicker() {
  var picker = document.getElementById('datePicker');
  picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
}

function closePeriodPicker() {
  var picker = document.getElementById('datePicker');
  if (picker) picker.style.display = 'none';
}

function updatePeriod() {
  var start = document.getElementById('startDate').value;
  var end = document.getElementById('endDate').value;
  if (start && end) {
    document.getElementById('campaignPeriod').value = start + ' ~ ' + end;
  } else if (start) {
    document.getElementById('campaignPeriod').value = start + ' ~';
  }
}

function resetPeriod() {
  document.getElementById('campaignPeriod').value = '';
  document.getElementById('startDate').value = '';
  document.getElementById('endDate').value = '';
  closePeriodPicker();
}

/* ===========================
   클릭 액션
=========================== */
function loadAction() {
  var action = prompt('클릭 액션 경로를 입력하세요:', document.getElementById('clickAction').value);
  if (action !== null) document.getElementById('clickAction').value = action;
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
  if (!name) {
    alert('캠페인명을 입력해주세요.');
    document.getElementById('campaignName').focus();
    return;
  }
  var period = document.getElementById('campaignPeriod').value.trim();
  if (!period) {
    alert('캠페인 기간을 설정해주세요.');
    return;
  }
  var types = document.querySelectorAll('input[name="campaignType"]:checked');
  if (types.length === 0) {
    alert('캠페인 유형을 하나 이상 선택해주세요.');
    return;
  }
  alert('캠페인이 저장되었습니다.\n\n캠페인명: ' + name);
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
    { no: 2, status: '사용', name: 'CRM 할인쿠폰',   benefit: '비율 할인', rate: '10 %',    period: '무제한', issued: '0 / 제한없음', orderLimit: '제한없음', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '한번만 다운로드 가능',   birthday: false, welcome: false, regDate: '2026-01-15 10:20:00' },
    { no: 1, status: '사용', name: 'CRM 맞춤 쿠폰',  benefit: '금액 할인', rate: '5,000 원',period: '무제한', issued: '0 / 제한없음', orderLimit: '10,000원 이상', env: 'APP\nWeb(PC/Mobile)', range: '전체 적용', method: '한번만 다운로드 가능', birthday: false, welcome: false, regDate: '2026-01-10 09:00:00' }
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
      '<td class="cl-td cl-td-name">' + c.name + '</td>' +
      '<td class="cl-td">' + c.benefit + '<br><span class="cl-rate">' + c.rate + '</span></td>' +
      '<td class="cl-td">' + c.period + '</td>' +
      '<td class="cl-td">' + c.issued + '</td>' +
      '<td class="cl-td">' + c.orderLimit + '</td>' +
      '<td class="cl-td">' + c.env.replace('\n', '<br>') + '</td>' +
      '<td class="cl-td">' + c.range + '</td>' +
      '<td class="cl-td">' + c.method + '</td>' +
      '<td class="cl-td">' + makeToggle(c.birthday) + '</td>' +
      '<td class="cl-td">' + makeToggle(c.welcome) + '</td>' +
      '<td class="cl-td" style="font-size:11px;color:#718096;">' + c.regDate + '</td>' +
      '<td class="cl-td"><div class="cl-mgmt-btns">' +
        '<button class="btn-del" onclick="deleteCouponRow(this)">삭제</button>' +
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

function toggleAllCheck(master) {
  document.querySelectorAll('.row-check').forEach(function(c) { c.checked = master.checked; });
}

function copyCouponRow(btn) { console.log('[쿠폰 복사]'); }
function editCouponRow(btn) { console.log('[쿠폰 수정]'); }
function deleteCouponRow(btn) { btn.closest('tr').remove(); }
