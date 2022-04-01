<script lang="ts">
import type { LoggedInUserType} from "../types/types";


  export let user: LoggedInUser

</script>
<div class="namebox">
  <div class="initials">{user.initials}</div>
  <div class="full_name">{user.full_name}</div>
</div>

<style>
  .namebox {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
  .initials {
    border-radius: 18px;
    background-color: #00d;
    color: white;
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
  }
  .full_name {
    margin: 1.5em;
  }
</style>