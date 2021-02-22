function reload() { location.reload(); }

        var loadTab = function (tab, isBack) {
            var tabName = tab.data("tab");
            if (!isBack) history.pushState(tabName, null, "?tab=" + tabName);
            var querystring = "?cmd=" + tabName;
            if (tab.data("id")) querystring += "&id=" + tab.data("id");
            FW.Lazy.Fetch(querystring, $("#content_body"));
            showSection('content_body');
        };
        window.addEventListener("popstate", function (e) {
            loadTab($("#" + e.state + "_tab"), true);
        });
        $("a.tab").on("click", function () {
            loadTab($(this), false);
            return false;
        });
        var qs = FW.decodeFormValues(location.search.substring(1));
        if (qs["tab"]) loadTab($("#" + qs["tab"] + "_tab"));
        else loadTab($("#homepage_tab"));

        $('.c_contained div#global').hide();

        function showSection(section){
            $('#content_body_detail').css('display','none');
            $('#content_body_detail').hide();
            $('#content_body').css('display','none');
            $('#content_body').hide();
            
            $('#'+section).show();
            $('#'+section).css('display','block');
        }

        function loadPerson(personid){
            $.ajax({
                url: '?' ,
                method: 'GET',
                data: {
                    cmd: 'detail',
                    irefid: personid
                },
                beforeSend: function() {
                    showSection('content_body_detail');
                    $("#content_body_detail").html('<strong>loading results </strong><img src=https://engage.macalester.edu/www/images/portal-elements/spinner-kit.gif />');
                },
                success: function(result) {
                    showSection('content_body_detail');
                    $('#content_body_detail').html(result);
                    $('html, body').animate({ scrollTop: $("#content_body_detail").offset().top }, 200);
                }
            });
            return false;
        };

        function loadMessageThread(personid){
            $.ajax({
                url: '?' ,
                method: 'GET',
                data: {
                    cmd: 'messages-121',
                    irefid: personid
                },
                beforeSend: function() {
                    showSection('content_body_detail');
                    $("#content_body_detail").html('<strong>loading messages </strong><img src=https://engage.macalester.edu/www/images/portal-elements/spinner-kit.gif />');
                },
                success: function(result) {
                    showSection('content_body_detail');
                    $('#content_body_detail').html(result);
                }
            });
            return false;
        };

        function logAction(guid,action) {
            $.ajax({
                url: "?cmd=db_add_log",
                method: "POST",
                data: {
                    cmd: 'db_add_log',
                    dir_log_action: action,
                    dir_log_note: guid
                } 
            }).done(function (result) {
                console.log('view logged')
            }).fail(function () {
                alert("error");
            });
        }

        logAction('{{guid}}','site_load');

        
