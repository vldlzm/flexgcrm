document.addEventListener('DOMContentLoaded', function () {
  setCampaignNameDefault();
  selectScreen(document.querySelector('.screen-item.active'));
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

function generateCoupon() {
  var code = 'CPN' + Math.random().toString(36).toUpperCase().slice(2, 8);
  console.log('[쿠폰 생성]', code);
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
  document.querySelector('input[name="contentType"][value="discount"]').checked = true;
  document.querySelector('input[name="target"][value="all"]').checked = true;
  document.getElementById('couponArea').style.display = 'none';
  document.getElementById('discountArea').style.display = 'block';
  document.getElementById('productArea').style.display = 'none';
  document.getElementById('memberCount').textContent = '0명';
  document.getElementById('memberQueryBtn').textContent = '전체 회원 조회 ›';
  resetPeriod();
  resetAction();
}
