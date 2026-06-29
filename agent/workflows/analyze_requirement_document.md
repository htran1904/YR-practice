Workflow: Phân Tích Requirement Document
Workflow này phân tích requirement documents (Jira tickets, .doc files, user stories, design mockups) và sinh ra một tài liệu phân tích chi tiết. KHÔNG sinh test cases — chỉ tập trung vào hiểu, phân rã, và phát hiện rủi ro/mơ hồ trong yêu cầu.
Quy tắc quan trọng
❌ KHÔNG sinh test cases — workflow này chỉ phân tích, không tạo TC
❌ KHÔNG tự đoán business logic nếu document không nói rõ → đưa vào Ambiguities
❌ KHÔNG bỏ qua comments trong Jira ticket — comments thường chứa thông tin quan trọng bổ sung
✅ PHẢI đọc related tickets nếu được reference trong AC
✅ PHẢI phân tích mockup chi tiết nếu được cung cấp (fields, layout, interactions)
✅ PHẢI ghi rõ inconsistency giữa document và mockup
✅ PHẢI viết bằng Tiếng Việt, format Markdown, xuất Artifact
✅ PHẢI copy hình ảnh vào thư mục artifacts nếu cần embed trong artifact
Mối quan hệ với workflows khác
Sau khi phân tích xong	Workflow tiếp theo
Cần sinh test cases nhanh	/generate_testcases_from_requirements
Cần sinh test cases bài bản (RBT 6 bước)	/generate_manual_testcases_rbt
Cần sinh automation scripts	/generate_automation_from_testcases
Cần phân tích cross-module	/generate_cross_module_test_plan