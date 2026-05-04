document.addEventListener('DOMContentLoaded', function () {
  setCampaignNameDefault();
});

/* ===========================
   캠페인명 기본값 (오늘 날짜 기반)
=========================== */
function setCampaignNameDefault() {
  var today = new Date();
  var y = today.getFullYear();
  var m = String(today.getMonth() + 1).padStart(2, '0');
  var d = String(today.getDate()).padStart(2, '0');
  var dateStr = '' + y + m + d;
  var el = document.getElementById('campaignName');
  if (el && !el.value) {
    el.value = '맞춤 시나리오로 보내기_' + dateStr + '_1';
  }
}

/* ===========================
   팝업 열기 / 닫기
=========================== */
function openPopup() {
  document.getElementById('popupBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popupBackdrop').classList.remove('open');
  document.body.style.overflow = '';
  closePeriodPicker();
}

// 백드롭 클릭 시 닫기
document.addEventListener('DOMContentLoaded', function () {
  var backdrop = document.getElementById('popupBackdrop');
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) {
        closePopup();
      }
    });
  }
});

/* ===========================
   캠페인 내용 타입 토글
=========================== */
function onContentTypeChange(radio) {
  if (radio.value === 'discount') {
    document.getElementById('discountArea').style.display = 'block';
    document.getElementById('productArea').style.display = 'none';
  } else {
    document.getElementById('discountArea').style.display = 'none';
    document.getElementById('productArea').style.display = 'block';
  }
}

function generateDiscountCode() {
  var code = 'CRM' + Math.random().toString(36).toUpperCase().slice(2, 8);
  alert('할인코드가 생성되었습니다: ' + code);
}

/* ===========================
   대상자 토글
=========================== */
function onTargetChange(radio) {
  var btn = document.getElementById('memberQueryBtn');
  if (radio.value === 'all') {
    btn.textContent = '전체 회원 조회 ›';
  } else {
    btn.textContent = '특정 고객 조회 ›';
  }
  document.getElementById('memberCount').textContent = '0명';
}

function queryMembers() {
  var target = document.querySelector('input[name="target"]:checked');
  if (target && target.value === 'all') {
    document.getElementById('memberCount').textContent = '전체 회원';
  } else {
    alert('특정 고객 필터를 설정합니다.');
  }
}

/* ===========================
   캠페인 유형 배지 토글
=========================== */
function onBadgeChange(checkbox, badgeId) {
  var badge = document.getElementById(badgeId);
  if (checkbox.checked) {
    badge.classList.add('active');
  } else {
    badge.classList.remove('active');
  }
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
  if (action !== null) {
    document.getElementById('clickAction').value = action;
  }
}

function resetAction() {
  document.getElementById('clickAction').value = '/Home/Index';
}

/* ===========================
   저장
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

  var classification = document.querySelector('input[name="classification"]:checked').value;
  var contentType = document.querySelector('input[name="contentType"]:checked').value;
  var target = document.querySelector('input[name="target"]:checked').value;
  var clickAction = document.getElementById('clickAction').value;

  var data = {
    classification: classification,
    name: name,
    contentType: contentType,
    target: target,
    period: period,
    clickAction: clickAction,
    campaignTypes: Array.from(types).map(function (el) { return el.value; })
  };

  console.log('[캠페인 저장]', data);
  alert('캠페인이 저장되었습니다.\n\n캠페인명: ' + name);
  closePopup();
}
