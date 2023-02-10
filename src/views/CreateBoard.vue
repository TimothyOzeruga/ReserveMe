<template>
    <div class="login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-12 col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Crete Board</div>
                        </div>
                        <div class="card-body">
                            <form novalidate @submit.prevent>
                                <div class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Board Name"
                                    />
                                </div>

                                <button class="btn btn-outline-success form-control">
                                    Create Board
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CreateBoard"
}
</script>

<style scoped>

</style>